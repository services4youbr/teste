package br.com.services4you.conteudo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Pagina.
 */
@Entity
@Table(name = "pagina")
public class Pagina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    private Grupo grupo;

    @OneToMany(mappedBy = "pagina")
    @JsonIgnore
    private Set<Conteudo> conteudos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Pagina titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getNome() {
        return nome;
    }

    public Pagina nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public Pagina grupo(Grupo grupo) {
        this.grupo = grupo;
        return this;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Set<Conteudo> getConteudos() {
        return conteudos;
    }

    public Pagina conteudos(Set<Conteudo> conteudos) {
        this.conteudos = conteudos;
        return this;
    }

    public Pagina addConteudos(Conteudo conteudo) {
        this.conteudos.add(conteudo);
        conteudo.setPagina(this);
        return this;
    }

    public Pagina removeConteudos(Conteudo conteudo) {
        this.conteudos.remove(conteudo);
        conteudo.setPagina(null);
        return this;
    }

    public void setConteudos(Set<Conteudo> conteudos) {
        this.conteudos = conteudos;
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
        Pagina pagina = (Pagina) o;
        if (pagina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pagina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pagina{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
