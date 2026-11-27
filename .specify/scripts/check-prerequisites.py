#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verificação de pré-requisitos do fluxo SDD — LinkContas.

Adaptado de github/spec-kit (scripts/python/check_prerequisites.py),
simplificado para rodar sem a CLI `specify`: sem presets/extensions.

Uso:
  python .specify/scripts/check-prerequisites.py               # docs da feature
  python .specify/scripts/check-prerequisites.py --include-tasks
  python .specify/scripts/check-prerequisites.py --require-spec
  python .specify/scripts/check-prerequisites.py --require-tasks
  python .specify/scripts/check-prerequisites.py --paths-only
  python .specify/scripts/check-prerequisites.py --json
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass


def find_repo_root() -> Path:
    start = Path(__file__).resolve().parents[2]  # .specify/scripts/ -> raiz
    if (start / ".specify").is_dir():
        return start
    cur = Path.cwd().resolve()
    while True:
        if (cur / ".specify").is_dir():
            return cur
        if cur.parent == cur:
            return Path.cwd().resolve()
        cur = cur.parent


def _resolve(value: str, repo_root: Path) -> Path | None:
    """Resolve feature_directory relativo à raiz ou a .specify/ (nosso layout)."""
    p = Path(value)
    if p.is_absolute():
        return p
    for base in (repo_root, repo_root / ".specify"):
        cand = base / p
        if cand.is_dir():
            return cand
    return repo_root / ".specify" / p  # padrão: .specify/specs/NNN-nome


def get_feature_dir(repo_root: Path) -> Path | None:
    raw = os.environ.get("SPECIFY_FEATURE_DIRECTORY", "")
    if raw:
        return _resolve(raw, repo_root)
    fj = repo_root / ".specify" / "feature.json"
    if fj.is_file():
        try:
            data = json.loads(fj.read_text(encoding="utf-8"))
            value = data.get("feature_directory") if isinstance(data, dict) else None
            if isinstance(value, str) and value:
                return _resolve(value, repo_root)
        except (OSError, json.JSONDecodeError):
            pass
    return None


def marker(ok: bool) -> str:
    return "[OK]" if ok else "[FAIL]"


def main(argv: list[str]) -> int:
    as_json = "--json" in argv
    require_spec = "--require-spec" in argv
    require_tasks = "--require-tasks" in argv
    include_tasks = "--include-tasks" in argv
    paths_only = "--paths-only" in argv

    repo_root = find_repo_root()
    feature_dir = get_feature_dir(repo_root)

    if paths_only:
        payload = {
            "REPO_ROOT": str(repo_root),
            "FEATURE_DIR": str(feature_dir) if feature_dir else "",
        }
        print(json.dumps(payload, ensure_ascii=True) if as_json else payload)
        return 0

    if feature_dir is None or not feature_dir.is_dir():
        print("ERROR: Diretório da feature nao encontrado.", file=sys.stderr)
        print("Rode /speckit.specify primeiro (cria specs/NNN-nome + "
              ".specify/feature.json).", file=sys.stderr)
        return 1

    plan = feature_dir / "plan.md"
    spec = feature_dir / "spec.md"
    tasks = feature_dir / "tasks.md"

    if not plan.is_file():
        print(f"ERROR: plan.md nao encontrado em {feature_dir}", file=sys.stderr)
        print("Rode /speckit.plan primeiro.", file=sys.stderr)
        return 1
    if plan.stat().st_size == 0:
        print(f"ERROR: plan.md vazio em {feature_dir}", file=sys.stderr)
        return 1
    if require_spec and not spec.is_file():
        print(f"ERROR: spec.md nao encontrado em {feature_dir}", file=sys.stderr)
        print("Rode /speckit.specify primeiro.", file=sys.stderr)
        return 1
    if require_tasks and not tasks.is_file():
        print(f"ERROR: tasks.md nao encontrado em {feature_dir}", file=sys.stderr)
        print("Rode /speckit.tasks primeiro.", file=sys.stderr)
        return 1

    docs: list[str] = []
    for name in ("research.md", "data-model.md", "quickstart.md"):
        if (feature_dir / name).is_file():
            docs.append(name)
    if (feature_dir / "contracts").is_dir() and any(
        (feature_dir / "contracts").iterdir()
    ):
        docs.append("contracts/")
    if include_tasks and tasks.is_file():
        docs.append("tasks.md")

    if as_json:
        print(json.dumps(
            {"FEATURE_DIR": str(feature_dir), "AVAILABLE_DOCS": docs},
            ensure_ascii=True, separators=(",", ":"),
        ))
        return 0

    print(f"FEATURE_DIR: {feature_dir}")
    print("AVAILABLE_DOCS:")
    for d in ("research.md", "data-model.md", "contracts/", "quickstart.md",
              "tasks.md" if include_tasks else None):
        if d is None:
            continue
        if d == "contracts/":
            ok = "contracts/" in docs
        elif d == "tasks.md":
            ok = tasks.is_file()
        else:
            ok = (feature_dir / d).is_file()
        print(f"  {marker(ok)} {d}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
