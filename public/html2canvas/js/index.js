$("#creat").click(function(){
    html2canvas($(".myImg")[0]).then(function (canvas){
      dataURL =canvas.toDataURL(1);
      $(".resultImg").attr("src", dataURL);
    })
 })