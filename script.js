const photos = new Array();
let photoCount;
let curCount = 0;
let noOfImagesToDisplay = 5;

$('#get-image').click(fetchImagesFromServer);

$('#prev').attr('disabled', true);

$('#prev').click(function () {
  console.log('prev', curCount)

  if (curCount - noOfImagesToDisplay >= 0) {
    curCount -= noOfImagesToDisplay;
    renderImages(curCount, curCount + noOfImagesToDisplay);

    $('#next').attr('disabled', false);

    if (curCount <= 0) {
      $('#prev').attr('disabled', true);
    }
  }
});

$('#next').click(function () {
  console.log(curCount)
  if (curCount + noOfImagesToDisplay <= photoCount) {
    curCount += noOfImagesToDisplay;
    renderImages(curCount, curCount + noOfImagesToDisplay);

    if (curCount - noOfImagesToDisplay > 0) {
      $('#prev').attr('disabled', false);
    }

    if (curCount + noOfImagesToDisplay >= photoCount) {
      $('#next').attr('disabled', true);
    }
  }
});

function renderImages(range1, range2) {
  let imgContainer = $('#img-container');
  imgContainer.html('');

  let renderPhotos = new Array();
  renderPhotos = photos.slice(range1, range2);

  for (let photo of renderPhotos) {
    let img = $(`<img src=${photo} val="image banner"></img>`);
    imgContainer.append(img);
  }
}

function fetchImagesFromServer() {
  photoCount = $('#no-of-images').val();
  console.log(photoCount);
  $.ajax({
    url: 'https://api.pexels.com/v1/curated',
    method: 'GET',
    headers: {
      "Authorization": "563492ad6f917000010000015ea2d7b51c16462ebbd14b5ae9735563"
    },
    data: {
      page: '1',
      per_page: $('#no-of-images').val()
    },
    success: function (data) {
      console.log(data.photos);

      for (let photo of data.photos) {
        photos.push(photo['src']['medium']);
      }

      curCount = 5;

      renderImages(0, 5);
    }
  });
}