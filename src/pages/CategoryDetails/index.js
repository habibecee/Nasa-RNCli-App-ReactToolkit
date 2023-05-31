import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralStyles, colors, fonts} from '../../Utils/GeneralStyles';
import {fetchCategoryDetails} from '../../features/CategoryDetails/CategoryDetailsSlice';
import Loading from '../../components/LoadingIcon';

export default function CategoryDetails({route}) {
  const id = route.params.id;
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state);

  console.log(data);

  useEffect(() => {
    dispatch(fetchCategoryDetails(id));
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView>
        <Loading />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <View>
          <Text> Error: {error} </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[GeneralStyles.SafeAreaView, styles.SafeAreaView]}>
      <View style={[GeneralStyles.container, styles.Container]}>
        <Text style={styles.SubText}> {route.params.title}</Text>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.ItemInfoContainer}>
            <Text style={styles.ItemDate}>{route.params.description}</Text>
            <Text style={styles.ItemExplanation}>{route.params.link}</Text>
          </View>

          <View style={styles.ItemContainer}></View>
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
});
