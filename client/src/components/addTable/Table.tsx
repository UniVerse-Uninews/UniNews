import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { StyleSheet} from 'react-native';
import React from 'react';
import {styles} from './tableStyle';


export function Table({usuarios}:{usuarios:any}) {
    const [page, setPage] = useState<number>(0);
    const [numPerPage] = useState([3, 4]);
    const [itemsPerPage, setItemsPerPage] = useState(numPerPage[0]);

    const inicio = page * itemsPerPage;
    const fim = Math.min((page + 1) * itemsPerPage, usuarios.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    return (
        <DataTable>
            <DataTable.Header style={styles.header}>
                <DataTable.Title style={styles.title} sortDirection='ascending'>ID</DataTable.Title>
                <DataTable.Title style={styles.title}>Usuário</DataTable.Title>
                <DataTable.Title style={styles.title}>Senha</DataTable.Title>
                <DataTable.Title style={styles.title}>E-mail</DataTable.Title>
                <DataTable.Title style={styles.title}>Tipo</DataTable.Title>
            </DataTable.Header>

            {usuarios.slice(inicio, fim).map(({t}:{t:any}) => (
                <DataTable.Row key={t.id} style={styles.row}>
                    <DataTable.Cell textStyle={styles.cell}>{t.id}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.cell}>{t.usuario}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.cell}>{t.senha}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.cell}>{t.email}</DataTable.Cell>
                    <DataTable.Cell textStyle={styles.cell}>{t.tipo}</DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(usuarios.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${inicio + 1}-${fim} de ${usuarios.length}`}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
            />
        </DataTable>
    );
}
export default Table;