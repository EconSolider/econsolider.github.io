### Dynare-Copilot — AI-Powered DSGE Model Development [[GitHub]](https://github.com/EconSolider/dynare-copilot)

**Dynare-Copilot** is a [Claude Code](https://claude.com/claude-code) skill that turns macroeconomic intuition into working Dynare `.mod` files with validated steady states and impulse response functions. It enforces a disciplined workflow — *derive first, translate second, validate incrementally* — to prevent the silent failures that are common in DSGE modeling.

<details>
<summary><strong>Key features</strong></summary>

- **Model generation & validation**: converts economic concepts into executable Dynare code, building incrementally and validating at each stage.
- **Smart reference system**: searches local libraries before the web, drawing on 149 MMB replication models and 89 Pfeifer Dynare syntax examples, plus a growing personal archive of previously-built models.
- **Error prevention & debugging**: requires approval of structural modeling choices before coding, maintains an error log of known issues and solutions, and — when connected to a MATLAB MCP server — runs Dynare automatically and iterates on failures.
- **Publication-ready output**: delivers journal-quality vector figures in PDF alongside the model code, run scripts, and derivation notes.

</details>

**Built with**: Claude Code · Dynare 7.1 · MATLAB / Octave · MATLAB MCP server (optional).

**Collaborators**

- [Jiannan (Jay) Jiang](https://jayjiangecon.github.io/) — Ph.D. student in Economics at The University of Texas at Austin, working on macroeconomics, textual data analysis, and machine learning applications in economics.

### AFNS: Arbitrage-Free Nelson–Siegel Models for Stata [[GitHub]](https://github.com/EconSolider/afns)

**AFNS** is a Stata package for estimating the three-factor arbitrage-free Nelson–Siegel term structure model of Christensen, Diebold and Rudebusch (2011). It extracts level, slope and curvature factors from bond yields and decomposes fitted yields into risk-neutral yields and term premia.

<details>
<summary><strong>Key features</strong></summary>

- **Estimation**: combines Kalman-filter maximum likelihood with an analytic gradient and factor smoothing.
- **Yield decomposition**: provides factors, fitted yields and term premia through `predict`, including at maturities outside the estimation set.
- **Curve conversion**: includes `parzero` to bootstrap zero-coupon yields from par yields, also available through the `parinput` option.
- **Flexible specifications and diagnostics**: supports wide and long data, parameter restrictions and calendar-based observation intervals, with postestimation checks of fit and factor dynamics.

</details>

**Built with**: Stata 16+ · Mata. The compiled library is included, with no external dependencies. MIT licensed.
