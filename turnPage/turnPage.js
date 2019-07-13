  
    HTMLDivElement.prototype.createTurnPage = function(arr,targetWidth,targetHeight){

    buildHtml(div ,targetWidth ,targetHeight);
    var timer = null;
    var sliderPage = document.getElementsByClassName('sliderPage')[0];                         
    var moveWidth = sliderPage.children[0].offsetWidth;//每次需要移动的距离
    var num = sliderPage.children.length-1;//图片种类数
    var leftBtn = document.getElementsByClassName('leftBtn')[0];
    var rightBtn = document.getElementsByClassName('rightBtn')[0];
    var allSpan = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span');
    var lock = true;
    var index = 0;
    leftBtn.onclick = function(){
        autoMove ('right->left');
    }
    rightBtn.onclick = function(){
        autoMove('left->right');
    }
    for(var i = 0;i < allSpan.length; i++){
        (function(myIndex){
            allSpan[i].onclick = function(){
                if(lock){
                    lock = false;
                    clearTimeout(timer);
                    index = myIndex;
                    startMove(sliderPage, {left: - index * moveWidth},function(){
                        lock = true;
                        timer = setTimeout(autoMove, 1500);
                        changeIndex(index);
                    })
                }            
            }
        })(i)
    }

    function autoMove(directive){
        if(lock){
            lock = false;
            clearTimeout(timer) ;           
            if(!directive || directive =='left->right'){
                index ++;              
                startMove(sliderPage,{left:sliderPage.offsetLeft - moveWidth},function(){
                    if(sliderPage.offsetLeft == - num*moveWidth){//每播完整显示最后一张图，瞬间让ul复位
                        sliderPage.style.left = '0px';
                        index = 0;
                    }
                    timer = setTimeout (autoMove,1500);
                    lock = true;
                    changeIndex(index);
                });
            }else if(directive == 'right->left'){
                if(sliderPage.offsetLeft == 0){
                    sliderPage.style.left = - num * moveWidth + 'px';
                    index = num;
                }
                index --;
                startMove(sliderPage, {left:sliderPage.offsetLeft + moveWidth},function(){                   
                    timer = setTimeout(autoMove,1500);    
                    lock = true; 
                    changeIndex(index);           
                }) 
            }
        }           
    }
    function changeIndex(_index){
        for(var i = 0; i < allSpan.length; i ++){
            allSpan[i].className = '';
        }
        allSpan[_index].className = 'active';
    }
    timer = setTimeout(autoMove,1500);
}