$(function() {
    //按下回车 把完整数据存储到本地
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        //没有读取到数据
        if (data == null) {
            return [];
        } else {
            //本地存储里面的数据是字符串格式，我们需要对象格式
            return JSON.parse(data); //也是数组，不过是有内容的
        }
    }
    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert('请输入您要的操作');
            } else {
                //先读取本地存储原来的数据
                var local = getDate(); //[{ title: 123, done: false }]
                console.log(local);
                //把local数组进行更新，把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false }); //[{title: 123, done: false},{title: 345, done: false}]
                //把这个数组local存储给本地存储
                saveDate(local);

                //toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    // 3. toDoList 删除操作
    $("ol, ul").on("click", "a", function() {
        // alert(11);
        // 先获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 4. toDoList 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        // data[?].done = ?
        data[index].done = $(this).prop("checked");
        console.log(data);
        //先保存data[index]
        var el = data[index];
        //删除这个数据
        data.splice(index, 1);
        //添加到末尾去
        data.push(el);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // //渲染加载到页面
    // function load() {
    //     //清空页面
    //     $("ol").empty();
    //     //拿数据
    //     var arr = getDate();
    //     for (var i = 0; i < arr.length; i++) {
    //         $("ol").prepend(
    //             `<li>
    //     <input type="checkbox">
    //     <p>${arr[i].title}</p>
    //         <a href="javascript:;"></a>
    // </li>`)
    //     }
    // }
    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
        // $("#todocount").text($("ol, li").length);
        // $("#donecount").text($("ul, li").length);
    }
})