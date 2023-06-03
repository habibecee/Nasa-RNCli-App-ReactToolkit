import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {fetchMediaDetails} from '../../features/NasaMediaDetails/NasaMediaDetailsSlice';
import VideoPlayer from 'react-native-video-player';
import Loading from '../../components/LoadingIcon';

function NasaMediaDetails({route}) {
  const {id, typeOf, itemDetail} = route?.params;
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state?.NasaMediaDetails);

  useEffect(() => {
    dispatch(fetchMediaDetails(id));
  }, [dispatch, id]);

  const isVideo = () => {
    const video = data?.find(item => item?.endsWith('~mobile.mp4'));
    console.log(video);
    return video;
  };

  const isImage = () => {
    const image = data?.find(item => item?.endsWith('~thumb.jpg'));
    console.log(image);
    return image;
  };

  const videoUri = isVideo();
  const imageUri = isImage();

  if (loading) {
    return (
      <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
        <View style={[GeneralStyles.container, styles.Container]}>
          <Loading />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
        <View style={[GeneralStyles.container, styles.Container]}>
          <Text style={styles.SubError}> Error: {error} </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        <ScrollView style={styles.ScrollView}>
          {typeOf === 'video' && videoUri && (
            <View style={styles.MediaContainer}>
              <VideoPlayer style={styles.VideoPlayer} video={{uri: videoUri}} />
            </View>
          )}

          {typeOf === 'image' && imageUri && (
            <View style={styles.MediaContainer}>
              <Image source={{uri: imageUri}} style={styles.MediaImage} />
            </View>
          )}

          <View>
            <Text style={styles.ItemTitle}>Details: </Text>

            {itemDetail?.data?.map((item, index) => {
              return (
                <View key={index} style={styles.ItemContainer}>
                  <Text style={styles.ItemNumber}>{index + 1}</Text>
                  <Text style={styles.ItemTitle}>Title: {item?.title}</Text>
                  <Text style={styles.ItemTitle}>Center: {item?.center}</Text>
                  <Text style={styles.ItemTitle}>
                    Date Created: {item?.date_created}
                  </Text>
                  <Text style={styles.ItemTitle}>
                    Media Type: {item?.media_type}
                  </Text>
                  <Text style={styles.ItemTitle}>
                    Description: {item?.description}
                  </Text>

                  <View>
                    <Text style={styles.ItemTitle}>Keywords: </Text>
                    {item?.keywords?.map((item, index) => {
                      return (
                        <Text key={index} style={styles.ItemTitle}>
                          {item}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>

          <View>
            <Text style={styles.ItemTitle}>Links: </Text>
            {itemDetail?.links?.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.ItemTitle}>{item?.rel}</Text>
                  <Text style={styles.ItemTitle}>{item?.render}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(item?.href)}>
                    <Text style={styles.ItemTitle}>URL: {item?.href}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  SubError: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.textPrice,
  },

  ScrollView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 20,
    margin: 10,
  },

  MediaContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },

  VideoPlayer: {
    width: '100%',
    height: 200,
  },

  MediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  ItemContainer: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.tertiary,
    marginBottom: 20,
    padding: 10,
  },
});

export default NasaMediaDetails;
