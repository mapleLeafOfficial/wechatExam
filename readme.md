# README: 微信在线考试系统

## 简介

欢迎使用微信在线考试系统！本平台基于 Java Spring Boot 框架，使用了开源项目 `yfexam-exam-main` 作为后端代码，旨在简化教育机构在线考试的管理和执行。系统经过适当的修改，以优化性能、可扩展性和用户体验。不论您是教育工作者还是学生，微信在线考试系统都能为您提供高效的考试解决方案。

## 主要功能

### 用户管理
- **学生注册：** 学生可以通过简单的表单轻松注册，提供用户名、电子邮件和密码等基本信息。
- **教师注册：** 教师注册时可以填写额外的信息，如教育背景和教学经验。
- **安全登录：** 学生和教师均可使用其凭据安全登录，系统会话管理确保流畅的用户体验。
- **个人信息管理：** 用户可以查看和更新个人信息，包括联系方式和学术记录。

### 考试管理
- **试题录入与编辑：** 教师和管理员可以通过直观的表单界面创建和编辑试题，支持选择题、填空题、编程题等多种题型。
- **试题分类：** 将试题组织到不同的分类中，方便检索和管理。
- **多种题型支持：** 系统支持多种题型，确保考试创建的灵活性。
- **定时考试：** 可为考试设置特定的时间限制，内置计时器确保遵守时间要求。
- **实时评分：** 学生提交答案后，教师可以即时评分，结果安全存储在数据库中。

### 前端设计
- **响应式设计：** 前端使用 HTML 和 JavaScript 构建，确保跨设备的响应式和用户友好界面。
- **动态页面：** 动态功能如交互式试题表单、实时计时器和响应式设计元素确保用户体验的吸引力。

## 开发环境
- **Java Spring Boot：** 系统后端基于 Spring Boot 框架，提供了快速、稳定的开发体验，并且易于扩展和维护。
- **yfexam-exam-main：** 我们使用了开源的 `yfexam-exam-main` 代码库，并进行了必要的修改以满足特定需求。
- **MySQL 数据库：** 所有考试数据均安全存储在 MySQL 数据库中，因其可靠性和可扩展性而被选择。

## 如何开始

1. **克隆仓库：**
   ```bash
   git clone https://github.com/yourusername/online-exam-system.git
   ```
2. **安装依赖：**
   ```bash
   mvn install
   ```
3. **设置数据库：**
   在 MySQL 中创建一个数据库并配置 `application.properties` 文件中的数据库连接信息。
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
4. **运行服务器：**
   ```bash
   mvn spring-boot:run
   ```
5. **访问系统：**
   打开浏览器，进入 `http://localhost:8080` 开始使用系统。

## 贡献

我们欢迎您的贡献！请 fork 本仓库，进行修改并提交 pull request。如有重大变更，请先打开 issue 讨论您希望更改的内容。

## 联系方式

如有任何问题或需要支持，请联系微信客服。对于后端代码的具体修改需求，请直接联系微信。

## 许可证

本项目遵循 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

---

感谢您选择我们的在线考试系统！希望它能满足您的需求，并提升您的考试流程。