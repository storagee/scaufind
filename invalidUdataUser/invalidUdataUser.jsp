<%@ page language="java" contentType="text/html; charset=UTF-8" isErrorPage="true" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>无权限</title>
    <link rel="stylesheet" type="text/css" href="<%=application.getContextPath() %>/style/invalidUdataUser.css?version=<%= application.getAttribute("version") %>" />
    <!--[if lte IE 9]>
        <style>
            * {
                opacity: 1 !important;
            }
            .invalid-container .mascot {
                top: 40%;
            }
        </style>
    <![ENDIF]-->
</head>
<body>
    <div class="invalid-container">
        <div class="key"></div>
        <div class="mascot"></div>
        <div class="bubble"><p>这是个重要情报，</p><p>请于US对接暗号~</p></div>
        <div class="box-etc-wrap">
            <div class="box"></div>
            <div class="lock"></div>
            <div class="shadow"></div>
        </div>
        <div class="tip">
            <p>Sorry！您没有有数登录权限，请参考 <a class="authorization-doc" href="#">权限申请文档</a> 发邮件申请，</p>
            <p>或联系游戏跟进US或系统管理员<a class="mail" href="mailto:gzyangwenfeng@corp.netease.com">&lt;gzyangwenfeng@corp.netease.com&gt;</a>。</p>
        </div>
        <a href="#" class="login">返回登录</a>
    </div>
<%--<script src="<%=application.getContextPath() %>/js/jquery-shortcuts/jquery.shortcuts.min.js"></script>--%>
</body>
</html>