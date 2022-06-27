import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useQuery, useQueryClient } from 'react-query'
import tw, { styled } from 'twin.macro'

import { getHello } from '@/lib/api'

const Wrapper = styled.section`
  ${tw`h-full grid place-items-center`}
`

const Button = styled.button`
  ${tw`py-2 px-4 bg-gray-100 mt-2 rounded-md border border-gray-300`}
`

const Home = (): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <Wrapper>
      <Head>
        <title>{t('page-title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold">{t('welcome-message')}</h1>

        <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
          <Button tw="mt-4">{t('change-locale')}</Button>
        </Link>
      </main>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common', 'footer'])),
  },
})

export default Home
