
var cv = document.getElementById('cv');
var c = cv.getContext('2d');
var txtDiv = document.getElementById('txt');
var fileBtn = document.getElementById("up-button");
var media = document.getElementById('vi');
var timer = null;
fileBtn.onchange = getVideo;
media.src = 'luoxiaohei.mp4';
init();

// 根据灰度生成相应字符
function toText(g) {
    if (g <= 30) {
        return '#';
    } else if (g > 30 && g <= 60) {
        return '&';
    } else if (g > 60 && g <= 120) {
        return '$';
    }  else if (g > 120 && g <= 150) {
        return '*';
    } else if (g > 150 && g <= 180) {
        return 'o';
    } else if (g > 180 && g <= 210) {
        return '!';
    } else if (g > 210 && g <= 240) {
        return ';';
    }  else {
        return '&nbsp;';
    }
}


// 根据rgb值计算灰度
function getGray(r, g, b) {
    return 0.299 * r + 0.578 * g + 0.114 * b;
}

// 转换
function init() {
    var width = media.width, height = media.height;
    txtDiv.style.width = width + 'px';
    txtDiv.style.height = height + 'px';
    cv.width = width;
    cv.height = width;
    c.drawImage(media, 0, 0, width, height);
    var imgData = c.getImageData(0, 0, width, width);
    var imgDataArr = imgData.data;
    var imgDataWidth = imgData.width;
    var imgDataHeight = imgData.height;
    var html = '';
    for (h = 0; h < imgDataHeight; h += 12) {
        var p = '<p>';
        for (w = 0; w < imgDataWidth; w += 6) {
            var index = (w + imgDataWidth * h) * 4;
            var r = imgDataArr[index + 0];
            var g = imgDataArr[index + 1];
            var b = imgDataArr[index + 2];
            var gray = getGray(r, g, b);
            p += toText(gray);
        }
        p += '</p>';
        html += p;
    }
    txtDiv.innerHTML = html;
    timer = setTimeout(init, 50);
}

// 获取图片
function getVideo(file) {
    var reader = new FileReader();
    reader.readAsDataURL(fileBtn.files[0]);
    reader.onload = function () {
        media.src = reader.result;
    }
}