import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper'; 
import { StatusBar } from 'expo-status-bar';
import { styles } from './tableUniversityStyle'; // Import styles from tableUniversityStyle
import { View } from 'react-native';
import { Name } from '../../theme/style';

export function Table({
  universities,
  onRowClick,
}: {
  universities: any;
  onRowClick: (clickedUniversity: any) => void;
}) {
  const [page, setPage] = useState<number>(0);
  const [numPerPage] = useState([2, 3]);
  const [itemsPerPage, setItemsPerPage] = useState(numPerPage[0]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const ViewStyleProps = {
    backgroundColor: '#F3C63B',
  };

  const inicio = page * itemsPerPage;
  const fim = Math.min((page + 1) * itemsPerPage, universities.length);

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
            <Name>Nome</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>Localização</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>Descrição</Name>
          </DataTable.Title>
          <DataTable.Title style={styles.title}>
            <Name>URL</Name>
          </DataTable.Title>
        </DataTable.Header>

        {universities.slice(inicio, fim).map((university: any) => (
          <DataTable.Row
            key={university.id}
            style={styles.row}
            onPress={() => handleRowClick(university)}
          >
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{university.id}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{university.name}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{university.location}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{university.description}</Name>
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.cell}>
              <Name>{university.url}</Name>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(universities.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${inicio + 1}-${fim} de ${universities.length}`}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          style={ViewStyleProps}

        />
      </DataTable>

      {/* StatusBar component */}
      <StatusBar style="auto" />
    </View>
  );
}

export default Table;
