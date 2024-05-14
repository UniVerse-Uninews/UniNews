import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet} from 'react-native';
import React from 'react';
import {styles} from './tableStyle';
import { View, Text } from 'react-native';


export function Table({ users }: { users: any }) {
    const [page, setPage] = useState<number>(0);
    const [numPerPage] = useState([3, 4]);
    const [itemsPerPage, setItemsPerPage] = useState(numPerPage[0]);
    const [selectedItem, setSelectedItem] = useState<any>(null); // State to track the selected item

    const inicio = page * itemsPerPage;
    const fim = Math.min((page + 1) * itemsPerPage, users.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    
    const handleRowClick = (item: any) => {
        setSelectedItem(item); 
    };

    return (
        <View>
            <DataTable>
                <DataTable.Header style={styles.header}>
                    <DataTable.Title style={styles.title} sortDirection='ascending'>ID</DataTable.Title>
                    <DataTable.Title style={styles.title}>Usuário</DataTable.Title>
                    <DataTable.Title style={styles.title}>Senha</DataTable.Title>
                    <DataTable.Title style={styles.title}>E-mail</DataTable.Title>
                    <DataTable.Title style={styles.title}>Tipo</DataTable.Title>
                </DataTable.Header>

                {users.slice(inicio, fim).map((t: any) => (
                    <DataTable.Row key={t.id} style={styles.row} onPress={() => handleRowClick(t)}>
                        <DataTable.Cell textStyle={styles.cell}>{t.id}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.cell}>{t.name}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.cell}>{t.passwordHash}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.cell}>{t.email}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles.cell}>{t.tipo}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(users.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${inicio + 1}-${fim} de ${users.length}`}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </DataTable>
           
        </View>
    );
}

export default Table;