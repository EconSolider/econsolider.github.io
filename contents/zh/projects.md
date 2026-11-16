### Dynare-Copilot：AI 驱动的 DSGE 模型开发工具 [[GitHub]](https://github.com/EconSolider/dynare-copilot)

**Dynare-Copilot** 是一个 [Claude Code](https://claude.com/claude-code) 技能（skill），能够将宏观经济学直觉转化为可运行的 Dynare `.mod` 文件，并给出经过验证的稳态与脉冲响应函数。它遵循“先推导、后翻译、逐步验证”的严格工作流程，以避免 DSGE 建模中常见的隐性错误。

**主要功能**

- **模型生成与验证**：将经济学概念转化为可执行的 Dynare 代码，逐步构建并在每个阶段进行验证。
- **智能参考体系**：优先检索本地资料库，再进行网络搜索。资料库包括 149 个 MMB 复现模型、89 个 Pfeifer 的 Dynare 语法示例，以及不断扩充的个人模型档案。
- **错误预防与调试**：编写代码前须先确认关键的模型结构设定；维护一份已知问题及其解决方法的错误日志；在连接 MATLAB MCP 服务器时，可自动运行 Dynare 并针对报错反复修正。
- **可直接用于发表的输出**：除模型代码、运行脚本和推导笔记外，还生成达到期刊发表质量的 PDF 矢量图。

**技术栈**：Claude Code · Dynare 7.1 · MATLAB / Octave · MATLAB MCP 服务器（可选）。

**合作者**

- [Jiannan (Jay) Jiang](https://jayjiangecon.github.io/)：得克萨斯大学奥斯汀分校经济学博士生，研究方向为宏观经济学、文本数据分析以及机器学习在经济学中的应用。
