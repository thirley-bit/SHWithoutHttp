import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { View, Text } from "@tarojs/components";
import { AtCard, AtAvatar, AtModal, AtIcon, AtBadge } from "taro-ui";
import "./PersonList.scss";

//人员列表组件
function PersonList(props) {
  const { dispatch, enter, showData, user, userList } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    dispatch({
      type: "users/getUserList",
    });
  }, []);

  const handleNav = () => {
    Taro.navigateTo({
      url: "/pages/addressList/message/MessageDetail/MessageDetail",
    });
  };

  const handleClick = (e) => {
    // console.log(e);
    let newId = e.message_id;
    setId(newId);
    // let url = "message/updateListById"
    // // let data = api[url].data
    // setShowData(data)
  };

  // const handleEnterMessage = () => {
  //   Taro.navigateTo({'/'})
  //   console.log(222)
  // }
  const handleEnterPhone = () => {
    console.log(333);
  };
  const handleDel = (e) => {
    setId(e.message_id);
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };
  const handleCancel = () => {
    setIsOpened(false);
  };

  const handleConfirm = () => {
    console.log(id); //删除接口
    setIsOpened(false);
  };

  return (
    <View className='person'>
      {showData.map((item, index) => {
        let title = "";
        let note = "";
        if (item.relative) {
          title = item.nick_name + "(" + item.relative + ")";
        } else {
          title = item.teacher;
          note = item.note;
        }
        return (
          <View key={index} className='card'>
            <AtCard
              key={index}
              className='card-item'
              onClick={() => handleClick(item)}
            >
              {/* 点击页面跳转至聊天界面 */}
              <View className='nav' onClick={enter == "message" && handleNav}>
                {/* 头像部分是否有新消息 */}
                {item.new == 1 ? (
                  // 如果有新消息，则加徽标
                  <View className='left'>
                    <AtBadge value={10}>
                      <AtAvatar
                        circle
                        className='img'
                        size='small'
                        image={item.avatar}
                      />
                    </AtBadge>
                  </View>
                ) : (
                  <View className='left'>
                    <AtAvatar
                      circle
                      className='img'
                      size='small'
                      image={item.avatar}
                    />
                  </View>
                )}
                <View className='card-content clearfix'>
                  {/* 老师列表展示的老师名称及其他信息 */}
                  <View className='card-center '>
                    <View className='card-name'>{title}</View>
                    <Text className='card-msg'>{note}</Text>
                  </View>
                </View>
              </View>
              {/* 右侧操作按钮（家人列表/学生列表无操作按钮  */}
              {item.teacher && (
                <View>
                  {enter == "address" && (
                    <View className='card_address'>
                      <View className='icon-message' onClick={handleNav}>
                        <AtIcon value='message' size='18' color='#03B615' />
                      </View>
                      <View className='icon-phone' onClick={handleEnterPhone}>
                        <AtIcon value='phone' size='18' color='#000' />
                      </View>
                    </View>
                  )}
                  <View
                    className={
                      enter == "message" ? "card-button" : "card-button_address"
                    }
                    onClick={() => handleDel(item)}
                  >
                    <AtIcon value='trash' size='18' color='#f00' />
                  </View>
                </View>
              )}
              {/* 仅在私信页面显示聊天时间 */}
              {enter == "message" && (
                <View className='card-right'>
                  <View className='card-time'>
                    <View>{item.time.slice(11, 17)}</View>
                  </View>
                </View>
              )}

              <AtModal
                isOpened={isOpened}
                cancelText='取消'
                confirmText='确认'
                onClose={handleClose}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                content={
                  enter == "message" ? "是否删除该聊天" : "是否删除该联系人"
                }
              />
            </AtCard>
          </View>
        );
      })}
    </View>
  );
}
export default connect((state) => ({
  user: state.users.user,
  userList: state.users.userList,
}))(PersonList);
