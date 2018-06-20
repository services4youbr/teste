package br.com.services4you.conteudo.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Conteudo.
 */
@Entity
@Table(name = "conteudo")
public class Conteudo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ordem")
    private Integer ordem;

    @Column(name = "conteudo")
    private String conteudo;

    @ManyToOne
    private Pagina pagina;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public Conteudo ordem(Integer ordem) {
        this.ordem = ordem;
        return this;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }

    public String getConteudo() {
        return conteudo;
    }

    public Conteudo conteudo(String conteudo) {
        this.conteudo = conteudo;
        return this;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Pagina getPagina() {
        return pagina;
    }

    public Conteudo pagina(Pagina pagina) {
        this.pagina = pagina;
        return this;
    }

    public void setPagina(Pagina pagina) {
        this.pagina = pagina;
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
        Conteudo conteudo = (Conteudo) o;
        if (conteudo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), conteudo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Conteudo{" +
            "id=" + getId() +
            ", ordem=" + getOrdem() +
            ", conteudo='" + getConteudo() + "'" +
            "}";
    }
}
