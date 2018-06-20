package br.com.services4you.conteudo.repository;

import br.com.services4you.conteudo.domain.Conteudo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Conteudo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {

}
