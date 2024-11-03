import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
} from './styles'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../service/api'

// open closed all

export default function Repositorio() {
  const { repositorio } = useParams()
  const [repo, setRepo] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  console.log('repositorio', repositorio)

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(repositorio)

      console.log('repositorio', repositorio)
      console.log('nomeRepo', nomeRepo)

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ])

      console.log('repo', repo)
      console.log('issues', issues)
      setRepo(repositorioData.data)
      setIssues(issuesData.data)
      setLoading(false)
    }

    load()
  }, [repositorio])

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = decodeURIComponent(repositorio)

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: 'open',
          page,
          per_page: 5,
        },
      })

      setIssues(response.data)
    }

    loadIssue()
  }, [page, repositorio])

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  if (loading) {
    return (
      <Loading>
        <p>Loading...</p>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={20} />
      </BackButton>
      <Owner>
        {!loading && (
          <>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <h1>{repo.name}</h1>
            <p>{repo.description}</p>
          </>
        )}
      </Owner>

      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage('back')}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Proxima
        </button>
      </PageActions>
    </Container>
  )
}
