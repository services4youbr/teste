package br.com.services4you.conteudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Site.
 */
@Entity
@Table(name = "site")
public class Site implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "url")
    private String url;

    @OneToMany(mappedBy = "site")
    @JsonIgnore
    private Set<Grupo> grupos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Site nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrl() {
        return url;
    }

    public Site url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Grupo> getGrupos() {
        return grupos;
    }

    public Site grupos(Set<Grupo> grupos) {
        this.grupos = grupos;
        return this;
    }

    public Site addGrupos(Grupo grupo) {
        this.grupos.add(grupo);
        grupo.setSite(this);
        return this;
    }

    public Site removeGrupos(Grupo grupo) {
        this.grupos.remove(grupo);
        grupo.setSite(null);
        return this;
    }

    public void setGrupos(Set<Grupo> grupos) {
        this.grupos = grupos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Site site = (Site) o;
        if (site.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), site.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Site{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
