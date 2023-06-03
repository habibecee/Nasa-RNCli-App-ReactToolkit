import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchNasaImages,
  fetchNasaVideos,
} from '../../features/NasaMedia/NasaMediaSlice';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import Loading from '../../components/LoadingIcon';
import SearchBar from '../../components/SearchBar';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NasaMedias() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.NasaMedia);
  const [choosedMediaType, setChoosedMediaType] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (choosedMediaType || searchQuery === 'image') {
      dispatch(fetchNasaImages());
    }

    if (choosedMediaType || searchQuery === 'video') {
      dispatch(fetchNasaVideos());
    }
  }, [dispatch, choosedMediaType, searchQuery]);

  const handleMediaTypeSelection = mediaType => {
    setChoosedMediaType(true);
    setSearchQuery(mediaType);
  };

  console.log('mediaType:', searchQuery);

  const handleImageSearch = query => {
    dispatch(fetchNasaImages(query));
  };

  const handleVideoSearch = query => {
    dispatch(fetchNasaVideos(query));
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.ItemContainer}
      key={item?.data?.nasa_id}
      onPress={() =>
        navigate('NasaMediaDetails', {
          id: item?.href,
          typeOf: searchQuery,
          itemDetail: item,
          title: item?.data[0]?.title,
        })
      }>
      {item?.links?.map((link, index) => (
        <Image key={index} style={styles.Image} source={{uri: link?.href}} />
      ))}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <Text style={styles.ChooseSubText}>CHOOSE MEDIA TYPE </Text>
      <View style={styles.ChooseContainer}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => handleMediaTypeSelection('image')}>
          <Icon name="images-sharp" color="gray" size={24} />
          <Text style={styles.IconText}>Images</Text>
        </TouchableOpacity>

        <View style={styles.Border}></View>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => handleMediaTypeSelection('video')}>
          <Icon name="videocam-sharp" color="gray" size={24} />
          <Text style={styles.IconText}>Videos</Text>
        </TouchableOpacity>
      </View>

      {choosedMediaType && (
        <View style={[GeneralStyles.container, styles.Container]}>
          {loading && <Loading />}

          {error && <Text style={styles.SubError}> Error: {error}</Text>}

          <SearchBar
            onSearch={
              searchQuery === 'image' ? handleImageSearch : handleVideoSearch
            }
          />

          {data && (
            <FlatList
              style={styles.FlatList}
              data={data?.items}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: 100}}
              renderItem={renderItem}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  ChooseSubText: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },

  ChooseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 30,
  },

  Border: {
    borderWidth: 1,
    height: '100%',
    borderColor: 'gray',
  },

  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  IconText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: 'gray',
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

  FlatList: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 25,
    width: Dimensions.get('window').width,
    gap: 30,
  },

  ItemContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    margin: 20,
    backgroundColor: colors.light,
    borderWidth: 0.5,
    borderColor: colors.tertiary,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
