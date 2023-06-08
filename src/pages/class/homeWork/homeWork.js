import { useState, useEffect } from "react";
import { View, Picker } from "@tarojs/components";
import { AtFab, AtIcon } from "taro-ui";
import Work from "@app/component/Work/Work";
import api from "@/api/api";
import "./HomeWork.scss";

// 作业页面
function HomeWork() {
  const [selector, setSelector] = useState([]); //科目选择项
  const [showWorkData, setShowWorkData] = useState([]); //作业列表
  const [time, setTime] = useState("");
  const [selectorChecked, setSelectorChecked] = useState(""); //选中的科目下标
  const onTimeChange = (e) => {
    setTime(e.detail.value);
  };
  const onSubChange = (e) => {
    setSelectorChecked(e.detail.value);
  };

  useEffect(() => {
    subData();
    homeWorkData();
  }, []);

  const subData = () => {
    let url = "subject/select";
    let data = api[url].data;
    setSelector(data);
  };

  const homeWorkData = () => {
    let url = "subject/list";
    let data = api[url].data;
    setShowWorkData(data);
  };
  return (
    <View className='main'>
      <View>
        <View className='content'>
        <View className='date'>
          <Picker mode='date' onChange={onTimeChange}>
            {time == "" ? "请选择日期" : time}
          </Picker>
        </View>
        <View className='selector'>
          <Picker
            mode='selector'
            range={selector.map((item) => item.subject_title)}
            onChange={onSubChange}
          >
            {selectorChecked == ""
              ? "请选择科目"
              : selector.filter((item) => item.subject_id == selectorChecked)[0]
                  .subject_title}
          </Picker>
        </View>
        </View>
        
      </View>
      <Work enter='homework' selector={selector} showData={showWorkData} />
    </View>
  );
}
export default HomeWork;
