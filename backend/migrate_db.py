from sqlalchemy import text
from app.database import engine

def add_column():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN hashed_password VARCHAR;"))
            conn.commit()
            print("Successfully added hashed_password column.")
        except Exception as e:
            print("Column might already exist or another error occurred:", e)

if __name__ == "__main__":
    add_column()
