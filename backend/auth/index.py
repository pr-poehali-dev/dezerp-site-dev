import json
import os
import hashlib
import psycopg2
import psycopg2.extras

SCHEMA = "t_p11831203_dezerp_site_dev"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Регистрация и вход игроков DezeRP."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action")  # "register" | "login"

    if action == "register":
        nickname = (body.get("nickname") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not nickname or not email or not password:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все поля"})}
        if len(nickname) < 3:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Никнейм минимум 3 символа"})}
        if len(password) < 6:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Пароль минимум 6 символов"})}

        gender = (body.get("gender") or "").strip()
        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(
                "INSERT INTO " + SCHEMA + ".users (nickname, email, password_hash, gender) VALUES (%s, %s, %s, %s) RETURNING id, nickname, email, gender, created_at",
                (nickname, email, pw_hash, gender)
            )
            row = cur.fetchone()
            conn.commit()
            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({"ok": True, "user": {"id": row[0], "nickname": row[1], "email": row[2], "gender": row[3], "created_at": row[4].isoformat() if row[4] else None}})
            }
        except Exception as e:
            conn.rollback()
            msg = str(e).lower()
            if "unique" in msg or "duplicate" in msg:
                return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Никнейм или email уже заняты"})}
            raise
        finally:
            cur.close()
            conn.close()

    elif action == "login":
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not email or not password:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все поля"})}

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, nickname, email, gender, created_at FROM " + SCHEMA + ".users WHERE email = %s AND password_hash = %s",
            (email, pw_hash)
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный email или пароль"})}

        return {
            "statusCode": 200,
            "headers": CORS,
            "body": json.dumps({"ok": True, "user": {"id": row[0], "nickname": row[1], "email": row[2], "gender": row[3], "created_at": row[4].isoformat() if row[4] else None}})
        }

    return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Неизвестное действие"})}