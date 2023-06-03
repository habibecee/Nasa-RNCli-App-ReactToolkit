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
import {useDispatch, useSelector} from 'react-redux';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {fetchMediaDetails} from '../../features/NasaMediaDetails/NasaMediaDetailsSlice';
import Video from 'react-native-video';
import Loading from '../../components/LoadingIcon';

function NasaMediaDetails({route}) {
  const {id, typeOf, itemDetail, title} = route?.params;
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state?.NasaMediaDetails);

  console.log('TYPEOF:', typeOf);

  useEffect(() => {
    dispatch(fetchMediaDetails(id));
  }, [dispatch, id]);

  const isVideo = () => {
    const video = data?.find(item => item?.endsWith('~mobile.mp4'));

    return video;
  };

  const videoUri = isVideo();
  const formattedUri = videoUri?.replace(/\s/g, '%20');

  console.log('VIDEO:', formattedUri);

  const isImage = () => {
    const image = data?.find(item => item?.endsWith('~thumb.jpg'));

    return image;
  };

  const imageUri = isImage();

  console.log('IMAGE:', imageUri);

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
          <View style={styles.MediaContainer}>
            {videoUri ? (
              <Video
                style={styles.VideoPlayer}
                source={{uri: formattedUri}}
                controls={true}
                playInBackground={false}
                paused={true}
              />
            ) : (
              <Text style={styles.ItemNumber}>NO DATA AVAILABLE</Text>
            )}
            <Image
              source={{uri: itemDetail?.links[0]?.href}}
              style={styles.MediaImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.sections}>
            <Text style={styles.SubText}>DETAILS: </Text>

            {itemDetail?.data?.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.ItemNumber}>{index + 1}</Text>
                  <Text style={styles.ItemSubText}>Title:</Text>
                  <Text style={styles.ItemTitle}>{item?.title}</Text>
                  <Text style={styles.ItemSubText}>Center:</Text>
                  <Text style={styles.ItemTitle}>{item?.center}</Text>
                  <Text style={styles.ItemSubText}>Date Created:</Text>
                  <Text style={styles.ItemTitle}>
                    {item?.date_created.substring(0, 10)}
                  </Text>
                  <Text style={styles.ItemSubText}>Media Type:</Text>
                  <Text style={styles.ItemTitle}>{item?.media_type}</Text>
                  <Text style={styles.ItemSubText}>Description:</Text>
                  <Text style={styles.ItemDescriptionTitle}>
                    {item?.description}
                  </Text>

                  <Text style={styles.ItemSubText}>Keywords: </Text>
                  {item?.keywords?.map((item, index) => {
                    return (
                      <Text style={styles.ItemNumber} key={index}>
                        {index + 1}{' '}
                        <Text key={index} style={styles.ItemTitle}>
                          {item}
                        </Text>
                      </Text>
                    );
                  })}
                </View>
              );
            })}
          </View>

          <View style={styles.sections}>
            <Text style={styles.SubText}>LINKS: </Text>
            {itemDetail?.links?.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.ItemSubText}>Rel: </Text>
                  <Text style={styles.ItemTitle}>{item?.rel}</Text>
                  <Text style={styles.ItemSubText}>Render: </Text>
                  <Text style={styles.ItemTitle}>{item?.render}</Text>
                  <Text style={styles.ItemSubText}>URL: </Text>
                  <TouchableOpacity onPress={() => Linking.openURL(item?.href)}>
                    <Text style={styles.ItemURL}>{item?.href}</Text>
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
  },

  SubError: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.textPrice,
  },

  ScrollView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingVertical: 30,
    borderWidth: 0.5,
  },

  MediaContainer: {
    width: Dimensions.get('window').width,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.tertiary,
  },

  VideoPlayer: {
    width: Dimensions.get('window').width - 20,
    height: 300,
  },

  MediaImage: {
    width: Dimensions.get('window').width - 20,
    height: 300,
  },

  sections: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.tertiary,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  ItemContainer: {
    flex: 1,
    paddingBottom: 20,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.darkBlue,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },

  ItemSubText: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },

  ItemTitle: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'left',
  },

  ItemDescriptionTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.primary,
    textAlign: 'justify',
  },

  ItemNumber: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.dark,
    textAlign: 'left',
  },

  ItemURL: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.linkBlue,
    textAlign: 'left',
  },
});

export default NasaMediaDetails;
