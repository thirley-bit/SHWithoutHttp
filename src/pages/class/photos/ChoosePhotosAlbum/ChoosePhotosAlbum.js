import { useEffect } from "react";
import { View } from "@tarojs/components";
import CardList from "@app/component/CardList/CardList";
import NavTab from '@app/component/NavTab/NavTab';
import { AtSearchBar } from "taro-ui";
import { connect } from "react-redux";

function ChoosePhotosAlbum(props) {
  const { dispatch, photosArr } = props;

  useEffect(() => {
    dispatch({
      type: "Photos/getPhotosList",
    });
  }, []);
  return (
    <View className='index'>
      
      <NavTab needBackIcon mainTitle='选择相册' />
      <CardList enter='photos' showData={photosArr} />
    </View>
  );
}
export default connect((state) => ({
  photosArr: state.Photos.photosArr,
}))(ChoosePhotosAlbum);
