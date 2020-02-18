import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import {
  Loading,
  Owner,
  IssueList,
  Pagination,
  Filter,
  FilterButton
} from './style';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string
      })
    }).isRequired
  };

  state = {
    repository: {},
    issues: [],
    issuesState: 'all',
    issuesPage: 1,
    loading: true,
    loadingIssues: false
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.loadIssues(repoName)
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false
    });
  }

  filterState = async e => {
    await this.setState({ issuesState: e.target.value });
    const { issuesState, repository } = this.state;
    this.setState({ loadingIssues: true });
    console.log(issuesState);
    const { data } = await this.loadIssues(repository.full_name);
    this.setState({ issues: data, loadingIssues: false });
  };

  async changePage(direction) {
    const { issuesPage, repository } = this.state;
    await this.setState({
      issuesPage: issuesPage + direction,
      loadingIssues: true
    });
    const issues = await (await this.loadIssues(repository.full_name)).data;
    this.setState({ issues, loadingIssues: false });
  }

  loadIssues(repoName) {
    const { issuesPage, issuesState } = this.state;
    return api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issuesState,
        page: issuesPage
      }
    });
  }

  render() {
    const {
      repository,
      issues,
      issuesPage,
      loadingIssues,
      issuesState,
      loading
    } = this.state;

    if (loading) {
      return <Loading> Carregando </Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList loadingIssues={loadingIssues ? 0 : 1}>
          <Filter>
            <FilterButton
              Active={issuesState === 'all' ? 1 : 0}
              onClick={this.filterState}
              value="all"
            >
              Todos
            </FilterButton>
            <FilterButton
              Active={issuesState === 'open' ? 1 : 0}
              onClick={this.filterState}
              value="open"
            >
              Abertos
            </FilterButton>
            <FilterButton
              Active={issuesState === 'closed' ? 1 : 0}
              onClick={this.filterState}
              value="closed"
            >
              Fechados
            </FilterButton>
          </Filter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Pagination>
            <button
              type="button"
              disabled={issuesPage === 1 ? 1 : 0}
              onClick={() => {
                this.changePage(-1);
              }}
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => {
                this.changePage(+1);
              }}
            >
              <FaArrowRight />
            </button>
          </Pagination>
        </IssueList>
      </Container>
    );
  }
}
