from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = os.getenv("SECRET_KEY", "supersecretjwtkey123456789")
ALGO = "HS256"

def hash_pwd(p): return pwd_context.hash(p)
def verify_pwd(p, h): return pwd_context.verify(p, h)
def create_token(data: dict):
    exp = datetime.utcnow() + timedelta(hours=2)
    data.update({"exp": exp})
    return jwt.encode(data, SECRET, algorithm=ALGO)

def luhn_check(num: str) -> bool:
    s=0; rev=num[::-1]
    for i,d in enumerate(rev):
        n=int(d)
        if i%2==1: n*=2; n=n-9 if n>9 else n
        s+=n
    return s%10==0