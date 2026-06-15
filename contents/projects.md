### Dynare-Copilot — AI-Powered DSGE Model Development

[[GitHub]](https://github.com/EconSolider/dynare-copilot)

**Dynare-Copilot** is a [Claude Code](https://claude.com/claude-code) skill that turns macroeconomic intuition into working Dynare `.mod` files with validated steady states and impulse response functions. It enforces a disciplined workflow — *derive first, translate second, validate incrementally* — to prevent the silent failures that are common in DSGE modeling.

**Key features**

- **Model generation & validation**: converts economic concepts into executable Dynare code, building incrementally and validating at each stage.
- **Smart reference system**: searches local libraries before the web, drawing on 149 MMB replication models and 89 Pfeifer Dynare syntax examples, plus a growing personal archive of previously-built models.
- **Error prevention & debugging**: requires approval of structural modeling choices before coding, maintains an error log of known issues and solutions, and — when connected to a MATLAB MCP server — runs Dynare automatically and iterates on failures.
- **Publication-ready output**: delivers journal-quality vector figures in PDF alongside the model code, run scripts, and derivation notes.

**Built with**: Claude Code · Dynare 7.1 · MATLAB / Octave · MATLAB MCP server (optional).
