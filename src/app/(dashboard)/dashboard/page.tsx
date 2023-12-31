import CustomDataTable from '@/components/dashboard/DataTables/CustomDataTable'
import Heading from '@/components/dashboard/Heading'
import SmallCardDataStats from '@/components/dashboard/DataCards/SmallCardDataStats'
import React from 'react'
import { CheckCheck, Eye, Loader2, RefreshCcw, ShoppingBag, ShoppingCart, Users2 } from 'lucide-react'
import LargeCardDataStats from '@/components/dashboard/DataCards/LargeCardDataStats'
import ChartOne from '@/components/dashboard/Charts/TotalChart'
import ChartThree from '@/components/dashboard/Charts/BestSellingChart'


const DashboardPage = () => {
  return (
    <div>
      <Heading title="Dashboard Overview"/>
      {/* Dashboard Cards */}
      <div className="py-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <LargeCardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <Eye className=' text-black dark:text-white'/>
        </LargeCardDataStats>
        <LargeCardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <ShoppingCart className=' text-black dark:text-white'/>
        </LargeCardDataStats>
        <LargeCardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
          <ShoppingBag className=' text-black dark:text-white'/>
        </LargeCardDataStats>
        <LargeCardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <Users2 className=' text-black dark:text-white'/>
        </LargeCardDataStats>
      </div>
      {/* Orders Cards */}
      <Heading title="Orders Overview"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        <SmallCardDataStats title="Total Order" total="$3.456K">
          <ShoppingCart className=' text-black dark:text-white'/>
        </SmallCardDataStats>
        <SmallCardDataStats title="Orders Pending" total="$45,2K">
          <Loader2 className=' text-black dark:text-white'/>
        </SmallCardDataStats>
        <SmallCardDataStats title="Order Processing" total="2.450">
          <RefreshCcw className=' text-black dark:text-white'/>
        </SmallCardDataStats>
        <SmallCardDataStats title="Orders Delivered" total="3.456">
          <CheckCheck className=' text-black dark:text-white'/>
        </SmallCardDataStats>
      </div>
      {/* <SmallCards/> */}
      {/* Charts */}
      <Heading title="Analystics Overview"/>
      <div className="mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
        <div className="col-span-12 xl:col-span-8 py-4">
          {/* Table */}
          <Heading title="Recent Orders"/>
          <CustomDataTable />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage