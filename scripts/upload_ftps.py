#!/usr/bin/env python3
import ftplib
import os
from pathlib import Path

HOST = "jump21.jump.bg"
USER = "vdiga-deploy@vdiga.bg"
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def ensure_dir(ftp: ftplib.FTP_TLS, remote_dir: str) -> None:
    current = ""
    for part in Path(remote_dir).parts:
        current += f"/{part}"
        try:
            ftp.mkd(current)
        except ftplib.error_perm as exc:
            if not str(exc).startswith("550"):
                raise
        ftp.sendcmd(f"SITE CHMOD 755 {current}")


def main() -> None:
    password = os.environ["FTP_PASS"]
    ftp = ftplib.FTP_TLS(timeout=30)
    ftp.connect(HOST, 21)
    ftp.login(USER, password)
    ftp.prot_p()

    for local in sorted(DIST.rglob("*")):
        remote = local.relative_to(DIST).as_posix()
        if local.is_dir():
            ensure_dir(ftp, remote)
            continue
        if local.parent != DIST:
            ensure_dir(ftp, local.parent.relative_to(DIST).as_posix())
        with local.open("rb") as source:
            ftp.storbinary(f"STOR /{remote}", source)
        ftp.sendcmd(f"SITE CHMOD 644 /{remote}")

    ftp.quit()


if __name__ == "__main__":
    main()
