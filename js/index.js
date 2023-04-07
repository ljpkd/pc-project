// 等待页面结构加载完毕后再调用
document.addEventListener('DOMContentLoaded', function () {
  initCrumbsNav()
  leftTabClick()
  bottomTabClick()
  rightPanelClick()
  rightMenu()
  initSmallPic()
  thumbImgClick()
  arrowClick()
  zoom()
  renderGoodBaseInfo()
  renderGoodsParamsInfo()
  goodsSizeClick()
  choosedClick()
  inputClick()
  topBack()
})

// 1.完成面包屑导航功能
function initCrumbsNav() {
  // 思路：
  // 1. 获取data.js->path路径数据
  var paths = goodData.path
  // 2. 根据数据动态创建a标签，在追加到指定父节点容器下面
  paths.forEach(function (path, index) {
    var aNode = document.createElement('a')
    aNode.innerText = path.title
    // 只要不是最后一项才加href属性
    if (index !== paths.length - 1) {
      // 非最后一项
      // console.log('非最后一项:', index)
      aNode.href = path.url
    } else {
      // 最后一项
      // console.log('最后一项:', index)
    }
    // 追加到指定父节点容器下面
    var conPoin = document.querySelector('.wrap .con .conPoin')
    conPoin.appendChild(aNode)
  })
}

// 2.给左边选修卡绑定单击切换事件
function leftTabClick() {
  //思路:
  //  1. 找对应h4标签，循环绑定单击事件
  // querySelectorAll返回的是一个节点列表NodeList，可以使用forEach
  // getElementsByTagName/ClassName返回的是一个元素集合HTMLCollection，不可以使用forEach，除非转成真数组
  var h4Els = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  )
  h4Els.forEach(function (h4Node, index) {
    // 2. 单击的时候。通过排他法添加类名
    h4Node.onclick = function () {
      h4Els.forEach(function (item) {
        item.className = ''
      })
      this.className = 'active'
      // 通过下标index找到对应的div容器，通过排他法操作类名
      var contentsEle = document.querySelectorAll(
        '.wrap .productDetail .aside .tabContent > div'
      )
      contentsEle.forEach(function (item) {
        item.className = ''
      })
      contentsEle[index].className = 'active'
    }
  })
}

// 3. 给底部选修卡绑定单击切换事件
function bottomTabClick() {
  //思路：
  // 1. 获取到对应的li，循环绑定单击事件
  var lisEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  )
  lisEle.forEach(function (liNode, index) {
    liNode.onclick = function () {
      // 2. 通过排他法，操作类名
      lisEle.forEach(function (item) {
        item.className = ''
      })
      this.className = 'active'
      var contents = document.querySelectorAll(
        '.wrap .productDetail .detail .intro .tabContent > div'
      )
      contents.forEach(function (item) {
        item.className = ''
      })
      contents[index].className = 'active'
    }
  })
}

// 4. 给页面右侧面板绑定单击事件
function rightPanelClick() {
  // 思路：
  // 1. 获取节点，循环绑定单击事件
  var butEle = document.querySelector('.wrap .toolBar .but')
  var isClose = true // 记录默认状态是折叠状态
  butEle.onclick = function () {
    // 根据不同状态切换设置不同的类名
    // 2. 当前元素切换类名 list和cross
    // 及其他盒子容器也要切换类名 toolWrap和toolOut
    // 找到对应容器
    var toolBar = document.querySelector('.wrap .toolBar')
    if (isClose) {
      // 折叠改成展开状态
      butEle.classList.replace('list', 'cross')
      toolBar.classList.replace('toolWrap', 'toolOut')
    } else {
      // 展开改成折叠状态
      butEle.classList.replace('cross', 'list')
      toolBar.classList.replace('toolOut', 'toolWrap')
    }
    //状态取反
    isClose = !isClose
  }
}

// 5. 给右侧菜单绑定鼠标悬浮和离开
function rightMenu() {
  // .wrap .toolBar .toolList li
  var lisEle = document.querySelectorAll('.wrap .toolBar .toolList li')
  // 循环绑定鼠标悬浮和离开
  lisEle.forEach(function (liNode, index) {
    liNode.onmouseenter = function () {
      // 找到当前li子元素i和em标签
      var iNode = this.querySelector('i')
      var emNode = this.querySelector('em')
      iNode.style.backgroundColor = 'rgb(200,17,34)'
      emNode.style.left = '-62px'
      // console.log('enter:', this)
    }
    liNode.onmouseleave = function () {
      // 找到当前li子元素i和em标签
      var iNode = this.querySelector('i')
      var emNode = this.querySelector('em')
      iNode.style.backgroundColor = 'rgb(122,110,110)'
      emNode.style.left = '35px'
      // console.log('leave:', this)
    }
  })
}

// 6. 初始化渲染小图
function initSmallPic() {
  // a:初始化小图
  var firstSmallSrc = goodData.imgsrc[0].s
  // b：创建图片节点
  var imgNode = new Image()
  imgNode.src = firstSmallSrc
  // 追加到小图容器中进行显示
  var smallImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  )
  smallImgBox.appendChild(imgNode)
  // 创建小图缩略图，所以的小图数据在data.js -> imgsrc
  var allImg = goodData.imgsrc
  // 每个缩略图本质就是一个li标签，li里面再去创建img标签
  allImg.forEach(function (item) {
    var liNode = document.createElement('li')
    var imgNode = new Image()
    imgNode.src = item.s
    // 把小图节点追加到li里面去
    liNode.appendChild(imgNode)
    // 把li追加到缩略图的容器中
    var list = document.querySelector(
      '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
    )
    list.appendChild(liNode)
  })
}

// 7. 给小图缩略图绑定单击事件
var index = 0 // 默认是第一张
function thumbImgClick() {
  // a:给所有的缩略图循环绑定单击事件
  var lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  )
  lisEle.forEach(function (liNode, i) {
    liNode.onclick = function () {
      // 点击对应的小缩略图，让上面的图展示对应的图片
      // 通过点击的下标index，获取到相应的小图片
      // var src = goodData.imgsrc[index].s
      var smallImg = document.querySelector(
        '.wrap .con .mainCon .previewWrap .preview .zoom img'
      )
      smallImg.src = goodData.imgsrc[i].s
      // 保存当前点击的下标到全局变量
      index = i
    }
  })
}

// 8. 给小缩略图的左右箭头绑定单击事件
function arrowClick() {
  var ul = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  )
  var rightEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  )
  var leftEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  )

  // 获取所有的li
  var lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  )

  var showNum = 5 // 默认仅能显示5展示

  // 记录小图容器已经走过的偏移量
  var ulLeft = 0

  var liWidth = lisEle[0].offsetWidth // 获取li的宽度

  // 获取右外边距
  var liRightMargin = parseInt(window.getComputedStyle(lisEle[0]).marginRight)

  // console.log('liWidth:', liWidth)
  // console.log('liRightMargin:', liRightMargin)
  // 每次偏移量宽度（li宽度 + li右外边距）
  var stepLeft = liWidth + liRightMargin

  // 最大的偏移量(所有li个数 - 默认5张) * 每次走的偏移量
  var maxLeft = (lisEle.length - showNum) * stepLeft
  // console.log('maxLeft:', maxLeft)

  // 右箭头单击事件
  rightEle.onclick = function () {
    // 限制最大的移动距离 750 = 10 * 75
    if (ulLeft === maxLeft) {
      return
    }
    // 每次累加75
    ulLeft += stepLeft
    ul.style.left = -ulLeft + 'px'
  }

  // 左箭头单击事件
  leftEle.onclick = function () {
    // 如果已经到了第一张，则不能在动了
    if (ulLeft === 0) {
      return
    }
    // 每次累减去75
    ulLeft -= stepLeft
    ul.style.left = -ulLeft + 'px'
    // console.log(ulLeft)
  }
}

// 9.实现放大镜功能
function zoom() {
  // 获取小图容器
  var smallImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  )
  var previewBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  )

  var mask = null
  var bigImgBox = null
  var bigImg = null
  //   给小盒子容器绑定鼠标悬浮
  smallImgBox.onmouseenter = function () {
    // 思路：
    // 1. 创建遮盖，及大图容器和大图片
    mask = document.createElement('div')
    mask.className = 'mask'
    // 把遮盖追加到小图容器内
    smallImgBox.appendChild(mask)
    // 2. 创建大图容器和大图片
    bigImgBox = document.createElement('div')
    bigImgBox.className = 'bigBox'
    bigImg = new Image()
    bigImg.src = goodData.imgsrc[index].b
    // 大图片追加到大图容器里面
    bigImgBox.appendChild(bigImg)
    // 把大图容器追加到previewBox中
    previewBox.appendChild(bigImgBox)
  }

  // 给小盒子容器绑定鼠标离开
  smallImgBox.onmouseleave = function () {
    // 删除遮盖，删除大容器
    smallImgBox.removeChild(mask)
    previewBox.removeChild(bigImgBox)

    // 页面遮盖、图片、大图容器已经从页面中删除了，变量就不需要引用
    // 所以，需要消除无效的DOM引用，让垃圾回收机制去回收变量
    // mask = null
    // bigImgBox = null
    // bigImg = null
    mask = bigImgBox = bigImg = null
  }

  // 给小图容器绑定鼠标移动事件
  smallImgBox.onmousemove = function (event) {
    // console.log('onmousemove');
    // 让鼠标在遮盖的正中心
    // 遮盖的top = y坐标 - 小盒子距离视口top - 遮盖 offsetHeight / 2
    var maskTop =
      event.clientY -
      smallImgBox.getBoundingClientRect().top -
      mask.offsetHeight / 2
    var maskLeft =
      event.clientX -
      smallImgBox.getBoundingClientRect().left -
      mask.offsetWidth / 2

    // 计算出遮盖的最大的偏移量top和left
    // 遮盖最大偏移top = 小图容器clientHeight - 遮盖offsetHeight
    var maskMaxMoveTop = smallImgBox.clientHeight - mask.offsetHeight
    var maskMaxMoveLeft = smallImgBox.clientWidth - mask.offsetWidth

    // console.log('maskMaxMoveTop-left:', maskMaxMoveTop, maskMaxMoveLeft)
    // console.log('maskTop-left:', maskTop, maskLeft)
    // 不能超过最大的偏移量
    if (maskTop > maskMaxMoveTop) {
      maskTop = maskMaxMoveTop // 贴在底边
    } else if (maskTop < 0) {
      maskTop = 0 // 贴在上边
    }

    if (maskLeft > maskMaxMoveLeft) {
      maskLeft = maskMaxMoveLeft // 贴在右边
    } else if (maskLeft < 0) {
      maskLeft = 0 // 贴在左边
    }

    mask.style.top = maskTop + 'px'
    mask.style.left = maskLeft + 'px'

    // 控制大图移动比例：
    // 比例关系：遮盖的移动距离（已知） / 遮盖最大的移动距离（已知） = 大图的移动距离（未知） / 大图的最大的移动距离（未知）
    // 大图的最大的移动距离top = 大图片的clientHeight - 大图容器的offsetHeight
    var bigImgMaxMoveTop = bigImg.clientHeight - bigImgBox.offsetHeight
    var bigImgMaxMoveLeft = bigImg.clientWidth - bigImgBox.offsetWidth

    // 大图的移动距离 = (遮盖的移动距离 * 大图的最大的移动距离) / 遮盖最大的移动距离
    var bigImgTop = (maskTop * bigImgMaxMoveTop) / maskMaxMoveTop
    var bigImgLeft = (maskLeft * bigImgMaxMoveLeft) / maskMaxMoveLeft
    bigImg.style.top = -bigImgTop + 'px'
    bigImg.style.left = -bigImgLeft + 'px'
  }
}

// 10.完成商品基本信息渲染
var selectNum = 0 // 默认选中的附加商品的数量
function renderGoodBaseInfo() {
  // 获取基本信息
  var goodsDetail = goodData.goodsDetail
  var goodsInfo = ` <h3 class="infoName">
      ${goodsDetail.title}
    </h3>
    <p class="news">
    ${goodsDetail.recommend}
    </p>
    <div class="priceArea">
      <div class="priceArea1">
        <div class="title">
          价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
        </div>
        <div class="price">
          <i>￥</i>
          <em>${goodsDetail.price}</em>
          <span>降价通知</span>
        </div>
        <div class="remark">
          <i>累计评价</i>
          <span>${goodsDetail.evaluateNum}</span>
        </div>
      </div>
      <div class="priceArea2">
        <div class="title">
          促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
        </div>
        <div class="fixWidth">
          <i>${goodsDetail.promoteSales.type}</i>
          <span>
          ${goodsDetail.promoteSales.content}
          </span>
        </div>
      </div>
    </div>
    <div class="support">
      <div>
        <div class="title">
          支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
        </div>
        <div class="fixWidth">
        ${goodsDetail.support}
        </div>
      </div>
      <div>
        <div class="title">配&nbsp;送&nbsp;至</div>
        <div class="fixWidth">${goodsDetail.address}</div>
      </div>
      
    </div>`
  // 把替换好的模板字符串赋值给对应的容器
  var info1 = document.querySelector('.wrap .con .mainCon .infoWrap .info1')
  info1.innerHTML = goodsInfo
  // 获取左侧的价格节点
  var leftPriceNode = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  )
  leftPriceNode.innerText = '¥' + goodsDetail.price

  // 右侧套餐价格节点
  var rightPriceNode = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  )

  var inputsEle = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem label input'
  )
  var totalPrice = goodsDetail.price
  inputsEle.forEach(function (inputNode) {
    // 获取选中的价格和原价进行累加
    if (inputNode.checked) {
      // 累加选中的数量
      selectNum++
      totalPrice += parseInt(inputNode.value)
    }
  })
  // console.log(selectNum)
  // 右侧套餐价 = 原价 + 假设附加商品选中的价格
  rightPriceNode.innerText = '¥' + totalPrice
  // 获取附选商品数量节点
  var selectNode = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
  )
  selectNode.innerText = selectNum
}

// 11. 渲染商品参数信息
function renderGoodsParamsInfo() {
  var goodsParams = goodData.goodsDetail.crumbData
  // a:渲染创建dl标签
  goodsParams.forEach(function (item) {
    // console.log('item:', item)
    var dl = document.createElement('dl')
    // b： 创建dt
    var dt = document.createElement('dt')
    dt.innerText = item.title
    // dt追加到dl中
    dl.appendChild(dt)

    // 取出参数item.data,每个具体的参数要创建一个dd
    item.data.forEach(function (paramInfo) {
      var dd = document.createElement('dd')
      dd.innerText = paramInfo.type
      // 给dd设置一个自定义属性，记录当前的价格，便于dd后续单击的时候，可以获取到其价格
      dd.setAttribute('price', paramInfo.changePrice)
      // dd追加到上面dl里面
      dl.appendChild(dd)
    })

    // 将dl追加到指定父容器中
    var chooseArea = document.querySelector(
      '.wrap .con .mainCon .infoWrap .choose .chooseArea'
    )
    chooseArea.appendChild(dl)
  })
}

// 12. 商品规格信息单击
let conditionArr = [0, 0, 0, 0] // 条件数组，0代表没有选中条件
function goodsSizeClick() {
  //找到dl
  let dls = document.querySelectorAll(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
  )
  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  )
  //循环dl找到dd
  dls.forEach(function (dl, dlIndex) {
    let dds = dl.querySelectorAll('dd')
    //循环dd绑定单击事件
    dds.forEach(function (dd) {
      dd.onclick = function () {
        //先排他思想改颜色
        dds.forEach(function (item) {
          item.style.color = 'rgb(102,102,102)'
        })
        //给当前dd颜色改为红色
        this.style.color = 'red'

        //将值存入到对应dl下标的条件数组,
        // 再将价格放到条件数组
        let price = parseInt(this.getAttribute('price'))
        // console.log(price);
        conditionArr[dlIndex] = { text: this.innerText, price: price }
        // console.log(conditionArr)
        //清空条件容器，防止累加条件
        choosed.innerText = ''

        //根据条件数组循环创建节点，并上树
        conditionArr.forEach(function (obj, dlIndex) {
          //判断是否为0，为0则跳过
          if (!obj) {
            return
          }
          //能过来说明不是0
          let mark = document.createElement('mark')
          mark.innerText = obj.text
          //创建a节点
          let a = document.createElement('a')
          //将dl的下标存到a标签上，便于删除的时候取出来，找到对应的dl
          a.setAttribute('dlIndex', dlIndex)
          a.innerText = 'X'
          //把a标签追加到mark上
          mark.appendChild(a)
          //把mark追加到choosed容器中
          choosed.appendChild(mark)
        })

        calcTotalPrice()
      }
    })
  })
}

// 13.删除条件节点，委托给父容器choosed
function choosedClick() {
  //1.将条件节点的单击事件委托给他的父容器（choosed）
  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  )
  choosed.onclick = function (event) {
    //判断如果target不是a标签则不做业务逻辑
    if (event.target.localName !== 'a') {
      return
    }
    let aNode = event.target
    // console.log(aNode); //打印的是整个元素节点
    //到这里说明是a标签，点击则要移除mark标签
    choosed.removeChild(aNode.parentElement)
    //找到对应下标的dl节点，找到所有dd节点，排他法
    let dlIndex = aNode.getAttribute('dlIndex')
    // console.log(dlIndex);
    let dl = document.querySelectorAll(
      '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
    )[dlIndex]
    let dds = dl.querySelectorAll('dd')
    dds.forEach(function (dd) {
      dd.style.color = 'rgb(102,102,102)'
    })
    dds[0].style.color = 'red'
    conditionArr[dlIndex] = 0
    calcTotalPrice()
  }
}

//计算价格方法
let totalPrice
function calcTotalPrice() {
  let totalPriceEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em'
  )
  let leftPrice = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  )
  let rightPrice = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  )
  let inputsEle = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem label input'
  )
  //获取默认原价
  totalPrice = goodData.goodsDetail.price

  //循环条件数组，获price
  conditionArr.forEach(function (obj) {
    //先判断是否选择
    if (obj.price) {
      // 为真说明有价格
      totalPrice += obj.price
    }
  })
  // console.log(totalPrice);
  //上树
  totalPriceEle.innerHTML = totalPrice

  //给左侧价格也更改
  leftPrice.innerText = '￥' + totalPrice
  //给右侧价格更改
  inputsEle.forEach(function (inputNode) {
    // 获取选中的价格和原价进行累加
    if (inputNode.checked) {
      totalPrice += parseInt(inputNode.value)
    }
  })
  rightPrice.innerText = '￥' + totalPrice
}

// 14. 给附选商品的复选框绑定单击事件，动态计算套餐价格和数量
function inputClick() {
  let selected = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
  )
  let inputsNode = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  )
  let rightPriceNode = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  )

  let selectedSum = 0 //默认选中0个
  inputsNode.forEach(function (inputNode) {
    inputNode.onclick = function () {
      //获取右边的价格
      let rightTotalPrice = parseInt(rightPriceNode.innerText.substr(1))

      if (inputNode.checked) {
        selectNum++
        rightTotalPrice = rightTotalPrice + parseInt(this.value)
      } else {
        selectNum--
        rightTotalPrice = rightTotalPrice - parseInt(this.value)
      }
      rightPriceNode.innerText = '¥' + rightTotalPrice
      selected.innerText = selectNum
    }
  })
}

// 15. 回到顶部
function topBack(){
    let topBackEle = document.querySelector('.wrap .toolBar .back i.tabIcon')
    topBackEle.addEventListener('click',function(){
      document.documentElement.scrollTop = document.body.scrollTop = 0
    })
}
