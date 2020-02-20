function sh(){
    var o = {};
    return o = {
        data:{

           "element_parent":"",
           "element":"" ,
           "element_child":"",

           "small_parent":"",
           "small_element":"",
           "small_child":"",

           "btn_function":"",
           "timer":null,


           
           "mun":0,
        },
        init:function(data){
            //赛选初始化数据
            $.each(data,function(i,n){
                o.data[i]=data[i];
            });
            var cloneL = $(this.data["element"]).clone();
            $(this.data["small_element"]).append(cloneL);
            // length;
            var small = $(this.data["small_child"]).length;
        },
        bigSlect:function(index){
            $.each(data,function(i,n){
                o.data[i]=index[i];
            });
            $(this.data["element_child"]).eq(index).fadeIn(500).siblings().fadeOut(500);
        };
        litleSlect:function(nums){
            $.each(data,function(i,n){
                o.data[i]=nums[i];
            });
            $(this.data["small_child"]).eq(nums).addClass('on').siblings().removeClass('on');
        },
        //点击缩略图
        $(data[""])
        setTimeout:function(){

        }
    }
}