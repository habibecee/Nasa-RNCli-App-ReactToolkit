import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../Utils/GeneralStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const lowercaseQuery = query.toLowerCase(); // Girilen değeri küçük harfe dönüştürün

    onSearch(lowercaseQuery);
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={colors.tertiary}
          type="text"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search-sharp" color={colors.primary} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignItems: 'flex-start',
    padding: 10,
    gap: 10,
  },

  InputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: colors.light,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  input: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default SearchBar;
