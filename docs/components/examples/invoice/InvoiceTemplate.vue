<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { Document, Image, Page, Text, View } from '@/components'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import PageCounter from '../../PageCounter.vue'
import { useDark, useDateFormat, useNow } from '@vueuse/core'
import { reactive, ref, watch } from 'vue'
import logo from './assets/vuepdf.png'
import { Style } from '@react-pdf/types'
import Table from './table/Table.vue'
import HeaderCell from './table/HeaderCell.vue'
import TableCell from './table/TableCell.vue'
import TableRow from './table/TableRow.vue'
import Divider from './Divider.vue'
import Watermark from './Watermark.vue'
withDefaults(
  defineProps<{
    customer?: string
  }>(),
  {
    customer: 'John Doe',
  },
)
const pageStyle = reactive<Style>({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '10px',
  paddingBottom: '60px',
})

const firstDayOfLastYear = new Date(new Date().getFullYear() - 1, 0, 1)
const lastDayOfLastYear = new Date(new Date().getFullYear() - 1, 11, 31)
const fakeData = ref([
  {
    service: 'Transaction Fee T1',
    amount: 130,
    quantity: 1,
  },
  {
    service: 'Transaction Fee T2',
    amount: 10,
    quantity: 0,
  },
  {
    service: 'Transaction Fee T3',
    amount: 20,
    quantity: 2,
  },
  {
    service: 'Transaction Fee T4',
    amount: 30,
    quantity: 3,
  },
  {
    service: 'Transaction Fee G1',
    amount: 130,
    quantity: 1,
  },
  {
    service: 'Transaction Fee G2',
    amount: 10,
    quantity: 0,
  },
  {
    service: 'Transaction Fee G3',
    amount: 20,
    quantity: 2,
  },
  {
    service: 'Transaction Fee G4',
    amount: 30,
    quantity: 3,
  },
  {
    service: 'Transaction Fee H1',
    amount: 130,
    quantity: 1,
  },
  {
    service: 'Transaction Fee H2',
    amount: 10,
    quantity: 0,
  },
  {
    service: 'Transaction Fee H3',
    amount: 20,
    quantity: 2,
  },
  {
    service: 'Transaction Fee H4',
    amount: 30,
    quantity: 3,
  },
  {
    service: 'Transaction Fee N1',
    amount: 130,
    quantity: 1,
  },
  {
    service: 'Transaction Fee N2',
    amount: 10,
    quantity: 0,
  },
  {
    service: 'Transaction Fee N3',
    amount: 20,
    quantity: 2,
  },
  {
    service: 'Transaction Fee N4',
    amount: 30,
    quantity: 3,
  },
  {
    service: 'Transaction Fee M1',
    amount: 130,
    quantity: 1,
  },
  {
    service: 'Transaction Fee M2',
    amount: 10,
    quantity: 0,
  },
  {
    service: 'Transaction Fee M3',
    amount: 20,
    quantity: 2,
  },
  {
    service: 'Transaction Fee M4',
    amount: 30,
    quantity: 3,
  },
])

const sharedStyles = reactive<{
  [key: string]: Style
}>({
  headerCell: {
    width: '268px',
    textAlign: 'left',
  },
  amountCell: {
    width: '15%',
    paddingHorizontal: '5px',
  },
  quantityCell: {
    width: '25%',
  },
  totalCell: {
    width: '25%',
  },
  totalRow: {
    paddingLeft: '41.8%',
    fontWeight: 'bold',
  },
  totalAmount: {
    width: '62.5%',
    paddingRight: '2px',
    justifyContent: 'flex-end',
  },
  totalAmountHeader: {
    justifyContent: 'flex-start',
    paddingLeft: '10px',
  },
})
</script>
<template>
  <Document>
    <Page :style="pageStyle">
      <View
        :style="{
          marginLeft: 'auto',
          display: 'flex',
          gap: '20px',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }"
      >
        <Image
          :src="logo"
          :style="{
            width: '100px',
          }"
        />
        <Text
          :style="{
            width: '100px',
            fontSize: '10px',
            textAlign: 'center',
            fontWeight: 'normal',
          }"
        >
          Vue PDF Example
        </Text>
      </View>
      <View
        :style="{
          display: 'flex',
          gap: '15px',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }"
      >
        <Text
          :style="{ fontSize: '8px', fontWeight: 'normal', textAlign: 'left' }"
          >Vue PDF Invoice Example - Everywhere - 12345 Every/Where
        </Text>
        <View
          :style="{
            display: 'flex',
            gap: '1px',
            flexDirection: 'column',
            fontSize: '10px',
            textAlign: 'left',
          }"
        >
          <Text>Everywhere EW </Text>
          <Text>{{ customer }} </Text>
          <Text>Anystreet. 23 </Text>
          <Text
            :style="{
              fontSize: '12px',
              fontWeight: 'normal',
              textAlign: 'left',
              width: '100%',
            }"
            >12345 Everywhere
          </Text>
        </View>
      </View>
      <Text
        :style="{
          fontSize: '12px',
          fontWeight: 'bold',
          marginTop: '30px',
        }"
        >Invoice Vue PDF Services
      </Text>
      <Table>
        <template #header>
          <HeaderCell><Text>Invoice No</Text></HeaderCell>
          <HeaderCell><Text>Customer No</Text></HeaderCell>
          <HeaderCell><Text>Invoice Period</Text></HeaderCell>
          <HeaderCell><Text>Date</Text></HeaderCell>
        </template>
        <template #body>
          <TableRow>
            <TableCell><Text>123456</Text></TableCell>
            <TableCell><Text>1234</Text></TableCell>
            <TableCell
              ><Text
                >{{ useDateFormat(firstDayOfLastYear, 'D/MM/YYYY') }} -
                {{ useDateFormat(lastDayOfLastYear, 'D/MM/YYYY') }}</Text
              ></TableCell
            >

            <TableCell
              ><Text>{{
                useDateFormat(new Date(), 'D MMM YYYY')
              }}</Text></TableCell
            >
          </TableRow>
        </template>
      </Table>
      <Table>
        <template #header>
          <HeaderCell :style="sharedStyles.headerCell"
            ><Text>Service Description</Text></HeaderCell
          >
          <HeaderCell :style="sharedStyles.amountCell"
            ><Text>Amount -without VAT-</Text></HeaderCell
          >
          <HeaderCell :style="sharedStyles.quantityCell"
            ><Text>quantity</Text></HeaderCell
          >
          <HeaderCell :style="sharedStyles.totalCell"
            ><Text>Total Amount</Text></HeaderCell
          >
        </template>
        <template #body>
          <TableRow v-for="item in fakeData" :key="item.service">
            <TableCell :style="sharedStyles.headerCell"
              ><Text>{{ item.service }}</Text></TableCell
            >
            <TableCell :style="sharedStyles.amountCell"
              ><Text>{{ item.amount }} €</Text></TableCell
            >
            <TableCell :style="sharedStyles.quantityCell"
              ><Text>{{ item.quantity }}</Text></TableCell
            >

            <TableCell :style="sharedStyles.totalCell"
              ><Text>{{ item.amount * item.quantity }} €</Text></TableCell
            >
          </TableRow>
          <Table
            :style="{
              fontSize: '10px',
            }"
          >
            <template #body>
              <TableRow :style="sharedStyles.totalRow">
                <HeaderCell :style="sharedStyles.totalAmountHeader"
                  ><Text>Total</Text></HeaderCell
                >
                <TableCell :style="sharedStyles.totalAmount"
                  ><Text
                    >{{
                      fakeData.reduce(
                        (acc, item) => acc + item.amount * item.quantity,
                        0
                      )
                    }}
                    €</Text
                  ></TableCell
                >
              </TableRow>
              <TableRow :style="sharedStyles.totalRow">
                <HeaderCell :style="sharedStyles.totalAmountHeader"
                  ><Text>VAT 19%</Text></HeaderCell
                >
                <TableCell :style="sharedStyles.totalAmount"
                  ><Text
                    >{{
                      Math.ceil(
                        fakeData.reduce(
                          (acc, item) => acc + item.amount * item.quantity,
                          0
                        ) * 0.19
                      )
                    }}
                    €</Text
                  ></TableCell
                >
              </TableRow>
              <TableRow :style="sharedStyles.totalRow">
                <HeaderCell :style="sharedStyles.totalAmountHeader"
                  ><Text>Gross Amount incl. VAT</Text></HeaderCell
                >
                <TableCell :style="sharedStyles.totalAmount"
                  ><Text
                    >{{
                      Math.ceil(
                        fakeData.reduce(
                          (acc, item) => acc + item.amount * item.quantity,
                          0
                        ) * 1.19
                      )
                    }}
                    €</Text
                  ></TableCell
                >
              </TableRow>
            </template>
          </Table>
        </template>
      </Table>
      <Text
        :style="{
          fontSize: '8px',
          marginTop: '20px',
        }"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nulla
        dolorem commodi consectetur in perspiciatis! Illum odit minima eveniet
        sequi ullam ipsam. Hic rem aspernatur id aut dolore facere ducimus.
      </Text>
      <Text
        :style="{
          fontSize: '8px',
        }"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nulla
        dolorem commodi consectetur in perspiciatis! Illum odit minima eveniet
        sequi ullam ipsam. Hic rem aspernatur id aut dolore facere ducimus.
      </Text>
      <Text
        :style="{
          fontSize: '8px',
          marginTop: '20px',
          fontStyle: 'italic',
        }"
        >This invoice is generated automatically using vue-pdf.
      </Text>
      <Text
        :style="{
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }"
        >Invoice Details
      </Text>
      <Table>
        <template #body>
          <TableRow>
            <TableCell><Text>Invoice No</Text></TableCell>
            <TableCell><Text>123456</Text></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Text>Customer No</Text></TableCell>
            <TableCell><Text>1234</Text></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Text>Invoice Period</Text></TableCell>
            <TableCell
              ><Text
                >{{ useDateFormat(firstDayOfLastYear, 'D/MM/YYYY') }} -
                {{ useDateFormat(lastDayOfLastYear, 'D/MM/YYYY') }}</Text
              ></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><Text>Date</Text></TableCell>
            <TableCell
              ><Text>{{
                useDateFormat(new Date(), 'D MMM YYYY')
              }}</Text></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><Text>Full Name</Text></TableCell>
            <TableCell
              ><Text>{{ customer }}</Text></TableCell
            >
          </TableRow>
        </template>
      </Table>
      <Divider></Divider>
      <Text :style="{ fontSize: '8px' }"
        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi libero
        suscipit recusandae harum, inventore hic dolores eum dolorem quisquam
        quos quibusdam rem nemo provident non animi a! Reiciendis, numquam
        porro.</Text
      >
      <Watermark :src="logo" />
      <PageCounter />
    </Page>
  </Document>
</template>
