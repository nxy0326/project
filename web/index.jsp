<%--
  Created by IntelliJ IDEA.
  User: wwj
  Date: 18-8-3
  Time: 下午8:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <script >
      var axml;
      var url="NettyServer";
      var jsonStr={"name":'ji',"age":20};
      var jsonArray=JSON.stringify(jsonStr);

      jQuery.ajax({
          type:"post",
          url:url,
          async:true,
          data:{mydata:jsonArray},

          contentType:"application/x-www-form-urlencoded",
          success:function (data,textStautus) {
              alert(data);
              alert("操作成功");
          },
          error:function (xhr,status,errMsg) {
              alert("操作失败")

          }

      })

  </script>
  <body>
  <input type="button" name="点击" >
  $END$
  </body>
</html>
