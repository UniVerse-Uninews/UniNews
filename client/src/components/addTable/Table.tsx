import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { styles } from './tableStyle';
import { View } from 'react-native';
import { Name } from '../../theme/style';

export function Table({
  users,
  onRowClick,
}: {
  users: any;
  onRowClick: (clickedUser: any) => void;
}) {
  const [page, setPage] = useState<number>(0);
  const [numPerPage] = useState([2, 3]);
  const [itemsPerPage, setItemsPerPage] = useState(numPerPage[0]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const inicio = page * itemsPerPage;
  const fim = Math.min((page + 1) * itemsPerPage, users.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    onRowClick(item);
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.title} sortDirection="ascending">
            <Name>ID</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>Usuário</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>Senha</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>E-mail</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>Tipo</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>Desativada</Name>
          </DataTable.Title>
        </DataTable.Header>

        {users.slice(inicio, fim).map((t: any) => (
          <DataTable.Row
            key={t.id}
            style={styles.row}
            onPress={() => handleRowClick(t)}
          >
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{t.id}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{t.name}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{t.passwordHash}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{t.email}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{t.role}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{t.desactivated}</Name>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(users.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${inicio + 1}-${fim} de ${users.length}`}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
}

export default Table;
