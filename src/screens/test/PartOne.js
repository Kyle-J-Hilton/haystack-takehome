import React from 'react';
import { View, SafeAreaView, Text, Image, FlatList, StyleSheet, StatusBar } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import localPlaceholderData from '../../localPlaceholderData';
import images from '../../../assets/images';


const Item = ({ id, title }) => (
    <View style={styles.item}>
         <Image
            source={images.code}
            style={{
                width: 38,
                height: 38,
            }}
        />
        <View style={styles.textContainer}>
            <Text style={styles.idText}>{id}</Text>
            <Text style={styles.titleText}>{title}</Text>
        </View>
        <AntDesign name='right' size={24} style={styles.chevron} />
    </View>
);

export default function PartOne() {
    return (
        <SafeAreaView style={styles.container}>
           
            <FlatList
                data={localPlaceholderData}
                renderItem={({ item }) => <Item id={item.id} title={item.title} />}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}


const hstkGold = '#FFCF45'



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#292933',
    },
    item: {
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        backgroundColor: 'white',
        opacity: 0.95,
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    leftIcon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        maxWidth: '50%',
    },
    idText: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 14,
        color: 'black',
    },
    chevron: {
        marginLeft: 'auto',
    },
});
