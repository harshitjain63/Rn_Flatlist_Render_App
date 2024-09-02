import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

type values = {

    id: string,
    case_number: string,
    date: string,
    block: string,
    iucr: string,
    primary_type: string,
    description: string,
    location_description: string,
    updated_on: string,
    fbi_code: string,
}

const Todos = () => {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    console.log(searchQuery);

    const { data: tododata } = useQuery({ queryKey: ['todo'], staleTime: 1000 * 60 * 5, queryFn: async () => await (await fetch(('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$query=SELECT%0A%20%20%60id%60%2C%0A%20%20%60case_number%60%2C%0A%20%20%60date%60%2C%0A%20%20%60block%60%2C%0A%20%20%60iucr%60%2C%0A%20%20%60primary_type%60%2C%0A%20%20%60description%60%2C%0A%20%20%60location_description%60%2C%0A%20%20%60arrest%60%2C%0A%20%20%60domestic%60%2C%0A%20%20%60beat%60%2C%0A%20%20%60district%60%2C%0A%20%20%60ward%60%2C%0A%20%20%60community_area%60%2C%0A%20%20%60fbi_code%60%2C%0A%20%20%60x_coordinate%60%2C%0A%20%20%60y_coordinate%60%2C%0A%20%20%60year%60%2C%0A%20%20%60updated_on%60%2C%0A%20%20%60latitude%60%2C%0A%20%20%60longitude%60%2C%0A%20%20%60location%60%0AORDER%20BY%20%60date%60%20DESC%20NULL%20FIRST'))).json() });

    const filteredTasks = useMemo(function getData() {
        if (!tododata) { return; }
        return tododata.filter((t: values) =>
            t.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, tododata]);

    const renderItem = useCallback(({ item }: { item: values }) => (

        <View style={styles.innercontainer}>
            <Text style={styles.id}>ID : {item.id}</Text>
            <Text style={styles.id}>case_number : {item.case_number}</Text>
            <Text style={styles.id}>date: {item.date}</Text>
            <Text style={styles.id}>block: {item.block}</Text>
            <Text style={styles.id}>iucr: {item.iucr}</Text>
            <Text style={styles.id}>primary_type: {item.primary_type}</Text>
            <Text style={styles.id}>description: {item.description}</Text>
            <Text style={styles.id}>location_description: {item.location_description}</Text>
            <Text style={styles.id}>updated_on: {item.updated_on}</Text>
            <Text style={styles.id}>fbi_code: {item.fbi_code}</Text>
        </View>

    ), []);

    const endHandle = useCallback(() => {
        if (!loading) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1300);
        }
    }, [loading]);

    const renderFooter = () => {
        if (!loading) {
            return null;
        }
        return <ActivityIndicator size="small" color="green" />;
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search description..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredTasks}
                // renderItem={({ item }) => <View style={styles.innercontainer}>
                //     <Text style={styles.id}>ID : {item.id}</Text>
                //     <Text style={styles.id}>case_number : {item.case_number}</Text>
                //     <Text style={styles.id}>date: {item.date}</Text>
                //     <Text style={styles.id}>block: {item.block}</Text>
                //     <Text style={styles.id}>iucr: {item.iucr}</Text>
                //     <Text style={styles.id}>primary_type: {item.primary_type}</Text>
                //     <Text style={styles.id}>description: {item.description}</Text>
                //     <Text style={styles.id}>location_description: {item.location_description}</Text>
                //     <Text style={styles.id}>updated_on: {item.updated_on}</Text>
                //     <Text style={styles.id}>fbi_code: {item.fbi_code}</Text>
                // </View>}
                renderItem={renderItem}
                onEndReached={endHandle}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 5,

    },
    innercontainer: {
        padding: 15,
        gap: 10,
        borderRadius: 10,
        borderColor: 'green',
        borderWidth: 5,
        marginVertical: 5,
    },
    id: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    image: {
        height: 40,
        width: '100%',
    },
    searchInput: {
        borderWidth: 4,
        borderColor: 'green',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: 'green',
        fontWeight: 'bold',
        backgroundColor: 'black'
    },
});

export default Todos;
