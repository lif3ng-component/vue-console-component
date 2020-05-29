# Message 消息

Message 用于显示成功回显和错误提示，如“修改成功”、“请求出错”。

成功消息:
```js
instance.$message('success')
// 或
instance.$message.success('success')
// 或
instance.$message({ type:'success', message: 'success' })
```

错误消息:
```js
instance.$message.error('error')
// 或
instance.$message({ type:'error', message: 'error' })
```
:::demo message-basic
:::