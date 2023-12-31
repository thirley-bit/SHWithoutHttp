import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { AtTabsPane, AtCard } from "taro-ui";
import NavTab from "@app/component/NavTab/NavTab";
import MyTabs from '@app/component/MyTabs/MyTabs';
import api from "@/api/api";
import "./moreArticle.scss";

//更多推荐文章页面
function MoreArticle() {
  const [articleList, setArticleList] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    tabData();
    articleData();
  }, []);

  const tabData = () => {
    let url = "article/tab";
    let data = api[url].data;
    setTabList(data);
  };
  const articleData = () => {
    // Taro.request({
    //   url:"http://localhost:9999/api/article/allList",
    // }).then((res) =>{
    let url = "article/list";
    let data = api[url].data;
    let newData = data;
    console.log(newData);
    //处理数据，按照类型生成四个数组
    // // let newData = res.data.data
    // if (!(newData instanceof Array) || newData.length == 0) {
    //   return {};
    // }
    // let map = {};
    // for (let i = 0; i < newData.length; i++) {
    //   if (newData[i] instanceof Array || newData.length < 2) {
    //     continue;
    //   }
    //   let type = newData[i].type;
    //   if (type != undefined) {
    //     if (map[type] == undefined) {
    //       map[type] = [];
    //     }
    //     map[type].push(newData[i]);
    //   }
    // }
    // console.log(map)
    // console.log(newData)
    setArticleList(newData);
  };
  const handleChange = (e) => {
    setCurrent(e);
  };
  const handleClick = (i) => {
    console.log(i);
    Taro.navigateTo({ url: "/pages/component/Article/Article" });
  };
  return (
    <View className='index'>
      <NavTab needBackIcon mainTitle='更多' />
      <MyTabs current={current} tabList={tabList} onClick={handleChange}>
        {tabList.map((item, index) => {
          return (
            <AtTabsPane key={index} current={current} index={index}>
              <View className='content'>
                {articleList &&
                  (item.title == "全部"
                    ? articleList
                    : articleList.filter((jtem) => jtem.type == item.type)
                  ).map((i) => {
                    return (
                      <View key={i.type_id} className='card'>
                        <AtCard
                          className='card-item'
                          title={i.title}
                          key={index}
                          onClick={() => handleClick(i)}
                        >
                          <View className='at-row at-row--wrap'>
                            <View className='at-col at-col-8 at-col--wrap'>
                              <View className='card-content'>{i.title}</View>
                              <View className='card-time'>{i.create_time}</View>
                            </View>
                            <View className='at-col at-col-3'>
                              <View className='card-img'>
                                <Image className='img' src={i.img_url} />
                              </View>
                            </View>
                          </View>
                        </AtCard>
                      </View>
                    );
                  })}
              </View>
            </AtTabsPane>
          );
        })}
      </MyTabs>
    </View>
  );
}
export default MoreArticle;
