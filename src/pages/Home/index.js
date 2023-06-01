import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDaily} from '../../features/Daily/DailySlice';
import Loading from '../../components/LoadingIcon';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import YouTube from 'react-native-youtube';

export default function Home() {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.Daily);

  useEffect(() => {
    dispatch(fetchDaily());
  }, [dispatch]);

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        <Text style={styles.SubText}> DAILY TODAY </Text>

        {loading && <Loading />}

        {error && <Text style={styles.SubError}> Error: {error} </Text>}

        <ScrollView style={styles.ScrollView}>
          {data && (
            <View>
              <View style={styles.ItemInfoContainer}>
                <Text style={styles.ItemDate}>{data?.date}</Text>
                <Text style={styles.ItemTitle}>{data?.title}</Text>
                <Text style={styles.ItemExplanation}>{data?.explanation}</Text>
              </View>

              <View style={styles.ItemContainer}>
                {data?.media_type === 'video' ? (
                  <YouTube
                    videoId={data?.url?.split('/').pop().split('?')[0]} // YouTube video kimliği
                    // play // Video otomatik olarak oynatılsın mı?
                    fullscreen // Videonun tam ekran oynatılmasını sağlar
                    loop
                    apiKey={process.env.YOUTUBE_API_KEY}
                    //YOUTUBE_API_KEY =  AIzaSyAwIHWfUal3Bd7r8Yw_5MSrYRsYvbalp90
                    style={{alignSelf: 'stretch', width: '100%', height: 300}}
                  />
                ) : (
                  <Image source={{uri: data?.url}} style={styles.Image} />
                )}
              </View>
            </View>
          )}
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  SubError: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.textPrice,
  },

  SubText: {
    fontFamily: fonts.bold,
    fontSize: 25,
    color: colors.textSecondary,
  },

  ScrollView: {
    width: 400,
    paddingHorizontal: 10,
  },

  ItemInfoContainer: {
    gap: 15,
    paddingHorizontal: 10,
  },

  ItemDate: {
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: 'justify',
    color: colors.secondary,
  },

  ItemTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    textAlign: 'center',
    color: colors.textPrice,
  },

  ItemExplanation: {
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'justify',
    color: colors.textSecondary,
  },

  ItemContainer: {
    marginVertical: 50,
  },

  Image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});
