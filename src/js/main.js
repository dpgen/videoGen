$(function () {
  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? null
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return null;
  }

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  function createErrorHtml() {
    return `
      <section class="error">
        <p class="big-note" style="text-align: center;">You have to register first to generate a DP!</p>
        <p class="small-note" style="text-align: center;">
          Click <a href="https://events.egfm.org/">here</a> to register.
        </p>
      </section>
    `;
  }
  function DifferenceInDays(firstDate, secondDate) {
    return Math.ceil((secondDate - firstDate) / (1000 * 60 * 60 * 24));
  }

  /* global variables */
  const today = new Date();
  const eventDate = new Date("2020/08/09");
  const daysToGo = DifferenceInDays(today, eventDate);
  const button = $(".create-dp");
  const fileInput = $("input[type=file]");
  const preview = $("img");
  const changebtn = $(".change");
  const fileInpbtn = $(".fileinput-button");
  const main = $("main");
  const mainContent = main.innerHTML;
  let uploadedImage="";

  // var queryName = getUrlParameter("name");
  // var requestKey = getUrlParameter("requestKey");
  // if (isEmptyOrSpaces(queryName) || isEmptyOrSpaces(requestKey)) {
  //   main.css("display", "flex");
  //   main.html(createErrorHtml());
  // } else {
  //   queryName.trim();
  //   if (queryName.length <= 15) {
  //     $("#fullname").val(queryName);
  //   } else {
  //     $("#fullname").val("");
  //   }
  // }
  main.css("display", "flex");

  $(".image-editor").cropit();

  $("form").submit(function (e) {
    e.preventDefault();
    var username = $("#fullname").val();
    var testimony = ""; /* $("#testimony").val();*/
    // Move cropped image data to hidden input
    var imageData = $(".image-editor").cropit("export", {
      type: "image/jpeg",
      quality: 1.0,
      originalSize: true,
    });
    $(".hidden-image-data").val(imageData);

    button.attr("disabled", "disabled").html("...processing");

    // x, y, width, height
    const picData = [50, 432, 440, 440];
    // name, y, x
    const nameData = [`${username}`, 484, 785.5, testimony];
    // const nameData = [username + ",", 1295, 685, ministryName];

    createDP(username, imageData, picData, nameData, function (url) {
      //adasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdadasdasdasdasdasdasdsaadsdasdasdasdasdasdasdasdasdasdadas
      // let count = getCount();
      // let images = getImageArray();
      // let progressSpan = null;
      // if (count === 0) {
      //   progressSpan = $("#image-1");
      // } else if (count === 1) {
      //   progressSpan = $("#image-2");
      // } else {
      //   progressSpan = $("#image-3");
      // }
      // console.log(progressSpan);
      // if (count < 2) {
      //   // console.log(count);
      //   // progressSpan.html(`<i class="fas fa-spinner fa-spin"></i>`);
      //   $.ajax({
      //     url: "https://api.cloudinary.com/v1_1/dguznibxz/image/upload",
      //     type: "POST",
      //     data: {
      //       file: url,
      //       upload_preset: "omdtbmls",
      //     },
      //     success: function (result) {
      //       console.log(result);
      //       console.log(result.public_id);
      //       images[count] = result.public_id;
      //       setCount(count + 1);
      //       setImageArray(images);
      //       let file = document.querySelector("input[type=file]").files[0];
      //       file.value = null;

      //       fileInpbtn.css({ display: "inline-block" });
      //       changebtn.css({ display: "none" });

      //       // progressSpan.html(`<i class="far fa-check-circle"></i>`);
      //       $(".cropit-preview-image").attr("src", "");
      //       button.removeAttr("disabled").html("Upload Next Image");
      //     },
      //     error: function (xhr, status, error) {
      //       console.log(error);
      //     },
      //   });
      //   return;
      // }
      // progressSpan.html(`<i class="fas fa-spinner fa-spin"></i>`);
      $.ajax({
        url: "https://api.cloudinary.com/v1_1/dguznibxz/image/upload",
        type: "POST",
        data: {
          file: url,
          upload_preset: "omdtbmls",
        },
        success: function (result) {
          console.log(result);
          console.log(result.public_id);
          uploadedImage = result.public_id;
          navigateTo("yourdp", createHTMLForImage(url));
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });

      function createHTMLForImage(url) {
        var headerText = document.getElementById("header-text");
        headerText.innerHTML = "";
        // let count = getCount();
        // let images = getImageArray();
        //   <video width="480" height="480" controls>
        //   <source src="https://res.cloudinary.com/dguznibxz/video/upload/w_1080,h_1080/l_${
        //     images[0]
        //   },so_0,eo_4/l_${images[1]},so_4,eo_8/l_${images[2]},so_8,eo_12/l_FinalPic_pncahn,so_12/AnamnesisClip_mbuvyh.mp4" type="video/mp4">
        // Your browser does not support the video tag.
        // </video>
        return `
          <section class="dp-container">
            <a href="?" class="arrow-back"><i class="ti-arrow-left"></i> Back</a>
            <div class="img-dp"> 
              <br>
              <br>
              <br>
              <br>
              <a class="download-dp" href="https://res.cloudinary.com/dguznibxz/video/upload/w_1080,h_1080/l_${uploadedImage},so_0,eo_4/l_frlyer_q9lnit,so_10,w_1080,h_1080/fl_attachment/SS21video_ybzrws.mp4" download="SS_DP_${username.replace(/\./g, "")}">Download Video</a>
              <br>
            </div>
            
            <p class="share">Don't forget to share the good news</p>
          </section>
        `;
      }
    });
  });
  /* file input */
  fileInput.on("change", function (e) {
    fileInpbtn.css({ display: "none" });
    changebtn.css({ display: "inline-block" });
  });

  /* change image btn */
  changebtn.on("click", function () {
    fileInput.click();
  });

  /* remove image btn */
  // deletebtn.on("click", function () {
  //   let file = document.querySelector("input[type=file]").files[0];
  //   file.value = null;

  //   fileInpbtn.css({ display: "inline-block" });
  //   changebtn.css({ display: "none" });
  //   deletebtn.css({ display: "none" });

  //   $(".cropit-preview-image").attr("src", "");
  // });

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  if (CanvasRenderingContext2D && !CanvasRenderingContext2D.renderText) {
    // @param  letterSpacing  {float}  CSS letter-spacing property
    CanvasRenderingContext2D.prototype.renderText = function (
      text,
      x,
      y,
      letterSpacing
    ) {
      if (!text || typeof text !== "string" || text.length === 0) {
        return;
      }

      if (typeof letterSpacing === "undefined") {
        letterSpacing = 0;
      }

      // letterSpacing of 0 means normal letter-spacing

      var characters = String.prototype.split.call(text, ""),
        index = 0,
        current,
        currentPosition = x,
        align = 1;

      if (this.textAlign === "right") {
        characters = characters.reverse();
        align = -1;
      } else if (this.textAlign === "center") {
        var totalWidth = 0;
        for (var i = 0; i < characters.length; i++) {
          totalWidth += this.measureText(characters[i]).width + letterSpacing;
        }
        currentPosition = x - totalWidth / 2;
      }

      while (index < text.length) {
        current = characters[index++];
        this.fillText(current, currentPosition, y);
        currentPosition +=
          align * (this.measureText(current).width + letterSpacing);
      }
    };
  }

  function createDP(username, imageUrl, pic, name, cb) {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      imageCount = 2,
      view = {
        x: pic[0],
        y: pic[1],
        width: pic[2],
        height: pic[3],
      },
      innerText = {
        x: view.width * 0.7,
        y: view.height - 80,
      };

    var userImg = loadImage(imageUrl);
    var frameImg = loadImage("./src/img/firstFrame.png");

    function loadImage(src) {
      var img = new Image();
      img.onload = transformImage;
      img.src = src;
      return img;
    }

    function transformImage() {
      if (--imageCount !== 0) return;

      canvas.width = frameImg.width;
      canvas.height = frameImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(frameImg, 0, 0);

      ctx.drawImage(userImg, view.x, view.y, view.width, view.height);
      // ctx.drawImage(
      //   registerImg,
      //   -4,
      //   110,
      //   registerImg.width,
      //   registerImg.height
      // );

      ctx = canvas.getContext("2d");

      //Write user name
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.font = "83px Seethara";
      ctx.fillStyle = "#a04c32";
      var canvasText = name[0];
      ctx.fillText(canvasText, name[2], name[1]);
      // ctx.renderText(name[3], name[2], name[1], 1);

      //Write testimony
      // ctx.font = "29.5px OpenSans-Bold";
      // ctx.fillStyle = "#46312b";
      // wrapText(ctx, name[3], 555, 538, 30, 37, 0);

      cb(canvas.toDataURL("image/jpeg", 1.0));
    }
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, letterSpacing) {
    var words = text.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      // var metrics = context.measureText(testLine);
      // var testWidth = metrics.width;
      if (testLine.length > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
        // if (maxWidth <= 25) {
        //   maxWidth += 5;
        // } else {
        //   maxWidth -= 5;
        // }
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function wrapTextLetter(
    context,
    text,
    x,
    y,
    maxLetters,
    lineHeight,
    letterSpacing
  ) {
    var letters = text.split("");
    var line = "";

    for (var n = 0; n < letters.length; n++) {
      var testLine = line + letters[n];
      if (testLine.length > maxLetters && n > 0) {
        context.fillText(line, x, y);
        line = letters[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  // var canvas = document.getElementById('myCanvas');
  // var context = canvas.getContext('2d');
  // var maxWidth = 400;
  // var lineHeight = 24;
  // var x = (canvas.width - maxWidth) / 2;
  // var y = 60;
  // var text = 'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.';

  // context.font = '15pt Calibri';
  // context.fillStyle = '#333';

  // wrapText(context, text, x, y, maxWidth, lineHeight, 0);

  function navigateTo(view, temp = "") {
    switch (view) {
      case "yourdp":
        main.html(temp);
        main.css({ background: "none" });
        break;
      default:
        main.style.background = "rgb(108, 86, 123)";
        main.innerHTML = mainContent;
    }
  }
  console.log("DOM fully loaded and parsed");
});
