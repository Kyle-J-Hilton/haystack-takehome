import React from 'react';
import { View, SafeAreaView, Text, FlatList, StyleSheet, StatusBar } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import localPlaceholderData from '../../localPlaceholderData';



const Item = ({ id, title }) => (
    <View style={styles.item}>
        <MaterialIcons name="post-add" size={24} style={styles.leftIcon} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9c2ff',
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
        color: 'grey',
    },
    chevron: {
        marginLeft: 'auto',
    },
});
