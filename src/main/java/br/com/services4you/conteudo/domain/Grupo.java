package br.com.services4you.conteudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Grupo.
 */
@Entity
@Table(name = "grupo")
public class Grupo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    private Site site;

    @OneToMany(mappedBy = "grupo")
    @JsonIgnore
    private Set<Pagina> paginas = new HashSet<>();

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

    public Grupo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Site getSite() {
        return site;
    }

    public Grupo site(Site site) {
        this.site = site;
        return this;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Set<Pagina> getPaginas() {
        return paginas;
    }

    public Grupo paginas(Set<Pagina> paginas) {
        this.paginas = paginas;
        return this;
    }

    public Grupo addPaginas(Pagina pagina) {
        this.paginas.add(pagina);
        pagina.setGrupo(this);
        return this;
    }

    public Grupo removePaginas(Pagina pagina) {
        this.paginas.remove(pagina);
        pagina.setGrupo(null);
        return this;
    }

    public void setPaginas(Set<Pagina> paginas) {
        this.paginas = paginas;
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
        Grupo grupo = (Grupo) o;
        if (grupo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grupo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Grupo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
