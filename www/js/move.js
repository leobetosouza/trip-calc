var pageActive = 0, // 0 preview, 1 add, 2 config
  pageEl = $('.page'),
  pageElActive,
  heightWindow = $(window).height()

function changeActivePage (page) {
  pageEl.removeClass('activePage')
  if (page == 0) {
    pageElActive = $('.preview')

  } else if (page == 1) {
    pageElActive = $('.add')

  } else {
    pageElActive = $('.config')
  }

  pageElActive.addClass('activePage')
}

function movePage (page) {
  if (page == pageActive) {
    return false
  }

  pageActive = page

  $('body').animate({
    scrollTop: (pageActive * heightWindow)
  }, 400)
}

$(document).ready(function(){
  pageEl.css({
    'height' : heightWindow
  })
  console.log()
  movePage(pageActive)
})