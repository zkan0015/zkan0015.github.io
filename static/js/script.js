var rot = 0,
  con = document.querySelector('#caro_con'),
  btns = document.querySelectorAll('button'),
  // 隐藏所有 Question
  questions = document.querySelectorAll('.caro_slide'),
  tran_time = 1000;

btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.className == 'btn_left') {
      if (((rot + 90) / 90 + 1) % 4 > 1) {
        ShowMsg("This is the first question")
        return
      }

      rot = rot + 90
      con.style.transform = 'rotate(' + rot + 'deg)'
      var column = Math.abs(rot) / 90 + 1
      console.log(column)
      var percent = (column / 14 * 100).toFixed(0)
      // 获取要更改的元素
      var progressElement = document.getElementById("progress");
      // 设置新的 data-progress-percent 值
      progressElement.setAttribute("data-progress-percent", percent.toString());
      $('.progress-wrap').data('progress-percent', percent.toString());
      moveProgressBar()
      // 如果您想要实际显示这个新值，您可以更新元素的文本内容
      document.getElementById("process1").innerHTML = "" + percent + "%";

      for (var i = ((Math.abs(rot) / 90 + 1) % 4); i <= 14; i = i + 4) {
        if (i == 0) {
          i = 4
        }
        if (i == Math.abs(rot) / 90 + 1) {
          questions[i - 1].style.display = "grid";
        } else {
          questions[i - 1].style.display = "none";
        }
      }
    }
    if (btn.className == 'btn_right') {
      if (Math.abs(rot - 90) / 90 + 1 > 14) {
        ShowMsg("This is the last question")
        var progressElement = document.getElementById("progress");
        // 设置新的 data-progress-percent 值
        progressElement.setAttribute("data-progress-percent", "100");
        $('.progress-wrap').data('progress-percent', "100");
        moveProgressBar()
        document.getElementById("process1").innerHTML = "&nbsp100%";
        return
      }
      rot = rot - 90
      con.style.transform = 'rotate(' + rot + 'deg)'
      var column = Math.abs(rot) / 90 + 1
      console.log(column)
      var percent = (column / 14 * 100).toFixed(0)
      // 获取要更改的元素
      var progressElement = document.getElementById("progress");
      // 设置新的 data-progress-percent 值
      progressElement.setAttribute("data-progress-percent", percent.toString());
      $('.progress-wrap').data('progress-percent', percent.toString());
      moveProgressBar()
      // 如果您想要实际显示这个新值，您可以更新元素的文本内容
      document.getElementById("process1").innerHTML = "" + percent + "%";

      for (var i = ((Math.abs(rot) / 90 + 1) % 4); i <= 14; i = i + 4) {
        if (i == 0) {
          i = 4
        }
        if (i == Math.abs(rot) / 90 + 1) {
          questions[i - 1].style.display = "grid";
        } else {
          questions[i - 1].style.display = "none";
        }
      }

    }
  })
})

window.addEventListener('keyup', function (e) {
  if (e.keyCode === 37) {
    if (Math.abs(rot - 90) / 90 + 1 > 14) {
      ShowMsg("This is the last question")
      var progressElement = document.getElementById("progress");
      // 设置新的 data-progress-percent 值
      progressElement.setAttribute("data-progress-percent", "100");
      $('.progress-wrap').data('progress-percent', "100");
      moveProgressBar()
      document.getElementById("process1").innerHTML = "&nbsp100%";
      return
    }

    rot = rot - 90
    con.style.transform = 'rotate(' + rot + 'deg)'
    var column = Math.abs(rot) / 90 + 1
    console.log(column)
    var percent = (column / 14 * 100).toFixed(0)
    // 获取要更改的元素
    var progressElement = document.getElementById("progress");
    // 设置新的 data-progress-percent 值
    progressElement.setAttribute("data-progress-percent", percent.toString());
    $('.progress-wrap').data('progress-percent', percent.toString());
    moveProgressBar()
    // 如果想要实际显示这个新值，更新元素的文本内容
    document.getElementById("process1").innerHTML = "" + percent + "%";
    for (var i = ((Math.abs(rot) / 90 + 1) % 4); i <= 14; i = i + 4) {
      if (i == 0) {
        i = 4
      }
      if (i == Math.abs(rot) / 90 + 1) {
        questions[i - 1].style.display = "grid";
      } else {
        questions[i - 1].style.display = "none";
      }
    }
  }
  if (e.keyCode === 39) {
    if (((rot + 90) / 90 + 1) % 4 > 1) {
      ShowMsg("This is the first question")
      return
    }

    rot = rot + 90
    con.style.transform = 'rotate(' + rot + 'deg)'
    var column = Math.abs(rot) / 90 + 1
    console.log(column)
    var percent = (column / 14 * 100).toFixed(0)
    // 获取要更改的元素
    var progressElement = document.getElementById("progress");
    // 设置新的 data-progress-percent 值
    progressElement.setAttribute("data-progress-percent", percent.toString());
    $('.progress-wrap').data('progress-percent', percent.toString());
    moveProgressBar()
    // 如果想要实际显示这个新值，更新元素的文本内容
    document.getElementById("process1").innerHTML = "" + percent + "%";
    for (var i = ((Math.abs(rot) / 90 + 1) % 4); i <= 14; i = i + 4) {
      if (i == 0) {
        i = 4
      }
      if (i == Math.abs(rot) / 90 + 1) {
        questions[i - 1].style.display = "grid";
      } else {
        questions[i - 1].style.display = "none";
      }
    }
  }
})


$(document).ready(function () {
  $(".submit-button").click(function () {
    var errorMessages = [];

    // 检查是否每个问题都有答案
    for (var i = 1; i <= 14; i++) {
      var selectedAnswer = $('input[name=group' + i + ']:checked').val();
      if (!selectedAnswer) {
        errorMessages.push("Please answer question " + (i + 1));
      }
    }

    // 如果有错误信息，则显示错误信息
    if (errorMessages.length > 0) {
      $("#error-message").html(errorMessages.join("<br>"));
      return;
    }
    $("#error-message").html("")

    // 收集用户的答案并发送到后端
    var answers = [];
    for (var i = 1; i <= 14; i++) {
      var selectedAnswer = $('input[name=group' + i + ']:checked').val();
      answers.push(selectedAnswer);
    }
    // 发送答案给后端
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/calculator", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // 处理后端返回的结果，可以根据需要进行页面跳转或其他操作
        const response = xhr.responseText;
        const responseContainer = document.getElementById('responseContainer');
        const main = document.getElementById('main');
        main.style.display = "none"
        document.getElementById("all").style.display = "none"
        responseContainer.innerHTML = response;
      }
    };

    const formData = new URLSearchParams();
    for (let i = 0; i < 14; i++) {
      formData.append(`question_${i}`, answers[i]);
    }

    xhr.send(formData);

  });
  $(".skip-button").click(function () {
    $("#error-message").html("Skip means Never");
    var i = Math.abs(rot) / 90;
    var id = 5 * i
    id = id + 1
    var radioId = document.querySelector('label[for="test' + id + '"]').getAttribute('for');
    // 选中对应的radio
    document.getElementById(radioId).checked = true;
    if (Math.abs(rot - 90) / 90 + 1 > 14) {
      ShowMsg("This is the last question")
      var progressElement = document.getElementById("progress");
      // 设置新的 data-progress-percent 值
      progressElement.setAttribute("data-progress-percent", "100");
      $('.progress-wrap').data('progress-percent', "100");
      moveProgressBar()
      document.getElementById("process1").innerHTML = "&nbsp100%";
      return
    }
    rot = rot - 90
    con.style.transform = 'rotate(' + rot + 'deg)'
    var column = Math.abs(rot) / 90 + 1
    console.log(column)
    var percent = (column / 14 * 100).toFixed(0)
    // 获取要更改的元素
    var progressElement = document.getElementById("progress");
    // 设置新的 data-progress-percent 值
    progressElement.setAttribute("data-progress-percent", percent.toString());
    $('.progress-wrap').data('progress-percent', percent.toString());
    moveProgressBar()
    // 如果您想要实际显示这个新值，您可以更新元素的文本内容
    document.getElementById("process1").innerHTML = "" + percent + "%";
    for (var j = ((Math.abs(rot) / 90 + 1) % 4); j <= 14; j = j + 4) {
      if (j == 0) {
        j = 4
      }
      if (j == Math.abs(rot) / 90 + 1) {
        questions[j - 1].style.display = "grid";
      } else {
        questions[j - 1].style.display = "none";
      }
    }
    setTimeout(() => {
      $("#error-message").html("");
    }, 1000)
  });
});

function selectRadio(id) {
  // 获取点击的label的for属性
  var radioId = document.querySelector('label[for="' + id + '"]').getAttribute('for');
  // 选中对应的radio
  document.getElementById(radioId).checked = true;
  //去下一页
  if (Math.abs(rot - 90) / 90 + 1 > 14) {
    ShowMsg("This is the last question")
    var progressElement = document.getElementById("progress");
    // 设置新的 data-progress-percent 值
    progressElement.setAttribute("data-progress-percent", "100");
    $('.progress-wrap').data('progress-percent', "100");
    moveProgressBar()
    document.getElementById("process1").innerHTML = "&nbsp100%";
    return
  }
  rot = rot - 90
  con.style.transform = 'rotate(' + rot + 'deg)'
  var column = Math.abs(rot) / 90 + 1
  console.log(column)
  var percent = (column / 14 * 100).toFixed(0)
  // 获取要更改的元素
  var progressElement = document.getElementById("progress");
  // 设置新的 data-progress-percent 值
  progressElement.setAttribute("data-progress-percent", percent.toString());
  $('.progress-wrap').data('progress-percent', percent.toString());
  moveProgressBar()
  // 如果您想要实际显示这个新值，您可以更新元素的文本内容
  document.getElementById("process1").innerHTML = "" + percent + "%";
  for (var i = ((Math.abs(rot) / 90 + 1) % 4); i <= 14; i = i + 4) {
    if (i == 0) {
      i = 4
    }
    if (i == Math.abs(rot) / 90 + 1) {
      questions[i - 1].style.display = "grid";
    } else {
      questions[i - 1].style.display = "none";
    }
  }
}

function goBack() {
  window.history.back();
}

// var progressElement = document.getElementById("progress");
//     // 设置新的 data-progress-percent 值
// progressElement.setAttribute("data-progress-percent","80");


// setTimeout(() => {
//   progressElement.setAttribute("data-progress-percent","10");
//   $('.progress-wrap').data('progress-percent',"10");
//   moveProgressBar()
// }, 5000)

