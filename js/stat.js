'use strict';

(function () {

  // statistics generating ----------------------------------------------------

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 15;
  var BAR_SPACE = 50;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;
  var TEXT_COLOR = '#000';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
    ctx.fillText(
        'Список результатов:',
        CLOUD_X + GAP * 2,
        CLOUD_Y + FONT_GAP + GAP * 3
    );
    var maxTime = getMaxElement(times);
    for (var i = 0; i < names.length; i++) {
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var barColor = 'rgba(2, 14 , 134,' + Math.random() + ')';
        ctx.fillStyle = barColor;
      }
      ctx.fillRect(
          GAP + CLOUD_X + BAR_WIDTH + BAR_WIDTH * i + BAR_SPACE * i,
          CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime,
          BAR_WIDTH,
          BAR_HEIGHT * times[i] / maxTime
      );
    }

    for (i = 0; i < times.length; i++) {
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(
          names[i],
          CLOUD_X + BAR_SPACE + BAR_WIDTH * i + BAR_SPACE * i,
          CLOUD_HEIGHT - GAP
      );
      ctx.fillText(
          Math.round(times[i]),
          GAP + CLOUD_X + BAR_WIDTH + BAR_WIDTH * i + BAR_SPACE * i,
          CLOUD_HEIGHT - GAP - FONT_GAP - BAR_HEIGHT * times[i] / maxTime - GAP
      );
    }
  };
})();
