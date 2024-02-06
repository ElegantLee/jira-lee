# 仿 Jira Demo

使用 React 相关技术栈进行实践的 demo.

## 功能简介

- 仿造 Jira 的 IT 开发流程和事务管理功能，实现了如下功能：

- 项目的创建、删除和编辑；

- 任务看板和任务组的拖拽及展示；

## 技术栈

React + Typescript + React Query + React Router + Redux + Antd + Emotion

## 特点

1. 大量使用 hooks；

2. 使用 git rebase 工作流；

3. 乐观更新；

4. 数据存在本地，使用 MSW 作为 Mock 工具；

## 跨组件状态管理

- 一般情况：状态提升；

- 缓存状态：react-query；

- 客户端状态：url + context

## 开发规范

变量采用**驼峰命名**，文件采用 **kebab-case**，代码格式化采用 **Prettier+ESLint** 的组合，git commit 检查采用 **commitlint**。
