# Upgrade Plan: SWO - Sistema de Gestión de Incidencias (20260409020157)

- **Generated**: 2026-04-09 02:01:57
- **HEAD Branch**: main
- **HEAD Commit ID**: 18d5e300b93257b5b067463f489eb98a490f8c5c

## Available Tools

**JDKs**
- JDK 17.0.18: D:\ECLIPSE\bin (JAVA_HOME, current active JDK, used by step 2)
- JDK 21.0.8: C:\Users\User\.jdk\jdk-21.0.8\bin (already installed, required by steps 3-4)

**Build Tools**
- Maven 3.9.14: D:\MAVEN\apache-maven-3.9.14-bin\apache-maven-3.9.14\bin (compatible with Java 21 ✓)
- No Maven Wrapper present in project

## Guidelines

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred. <!-- this note is for users, NEVER remove it -->

## Options

- Working branch: appmod/java-upgrade-20260409020157 <!-- user specified, NEVER remove it -->
- Run tests before and after the upgrade: true <!-- user specified, NEVER remove it -->

## Upgrade Goals

- Upgrade Java from 8 to 21 (latest LTS)

### Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 8 | 21 | User requested |
| Maven | 3.9.14 | 3.9.0 | - (already compatible) |
| maven-compiler-plugin | 3.11.0 | 3.11.0 | - (already compatible) |
| javax.servlet-api | 4.0.1 | 4.0.1 | - (stays as-is; no Jakarta migration needed without Spring Boot 3+) |
| javax.servlet.jsp-api | 2.3.3 | 2.3.3 | - |
| jstl | 1.2 | 1.2 | - |
| mysql-connector-java | 8.0.33 | 8.0.33 | - (compatible with Java 21) |
| junit | 4.13.2 | 4.13.2 | - |
| tomcat7-maven-plugin ⚠️ EOL | 2.2 | N/A | EOL; only used for dev deployment (`mvn tomcat7:run`), does not affect WAR compilation; Java 21 JVM may exhibit incompatibilities at runtime via this plugin |

### Derived Upgrades

- Update `maven.compiler.source` and `maven.compiler.target` from `1.8` to `21` in `<properties>` (required for Java 21 bytecode compilation)
- Update `maven-compiler-plugin` `<source>` and `<target>` from `1.8` to `21` (explicit plugin config must match)
- No maven wrapper to update (no mvnw present)

## Upgrade Steps

- **Step 1: Setup Environment**
  - **Rationale**: JDK 21 is already available at `C:\Users\User\.jdk\jdk-21.0.8\bin`. No installations needed; verify readiness.
  - **Changes to Make**:
    - [ ] Confirm JDK 21.0.8 available at `C:\Users\User\.jdk\jdk-21.0.8\bin`
    - [ ] Confirm Maven 3.9.14 available
  - **Verification**:
    - Command: `#appmod-list-jdks` to confirm
    - Expected: JDK 21 present

---

- **Step 2: Setup Baseline**
  - **Rationale**: Establish pre-upgrade compile/test results using current JDK 17 / source 1.8 settings.
  - **Changes to Make**:
    - [ ] Run baseline compilation with JDK 17 (current JAVA_HOME)
    - [ ] Run baseline tests with JDK 17
  - **Verification**:
    - Command: `$env:JAVA_HOME='D:\ECLIPSE'; mvn clean test-compile -q; mvn clean test -q`
    - JDK: D:\ECLIPSE\bin (Java 17.0.18 — current JAVA_HOME)
    - Expected: Document SUCCESS/FAILURE and test counts (forms acceptance criteria)

---

- **Step 3: Upgrade Java Compiler to 21**
  - **Rationale**: Core goal. Update pom.xml to target Java 21 bytecode. The codebase uses no removed APIs, so direct upgrade is safe.
  - **Changes to Make**:
    - [ ] Change `maven.compiler.source` from `1.8` to `21`
    - [ ] Change `maven.compiler.target` from `1.8` to `21`
    - [ ] Update maven-compiler-plugin `<source>` from `1.8` to `21`
    - [ ] Update maven-compiler-plugin `<target>` from `1.8` to `21`
  - **Verification**:
    - Command: `$env:JAVA_HOME='C:\Users\User\.jdk\jdk-21.0.8'; mvn clean test-compile -q`
    - JDK: C:\Users\User\.jdk\jdk-21.0.8\bin (Java 21.0.8)
    - Expected: Compilation SUCCESS (both main and test code)

---

- **Step 4: Final Validation**
  - **Rationale**: Verify Java 21 goal met, project compiles and all tests pass with the new JDK.
  - **Changes to Make**:
    - [ ] Verify `<maven.compiler.source>21</maven.compiler.source>` and `<maven.compiler.target>21</maven.compiler.target>` in pom.xml
    - [ ] Clean rebuild with JDK 21
    - [ ] Run full test suite and fix any failures
  - **Verification**:
    - Command: `$env:JAVA_HOME='C:\Users\User\.jdk\jdk-21.0.8'; mvn clean test`
    - JDK: C:\Users\User\.jdk\jdk-21.0.8\bin (Java 21.0.8)
    - Expected: Compilation SUCCESS + 100% tests pass (≥ baseline)

## Key Challenges

- **tomcat7-maven-plugin EOL**
  - **Challenge**: `tomcat7-maven-plugin 2.2` is EOL and not designed for Java 9+ module system. `mvn tomcat7:run` may fail with Java 21.
  - **Strategy**: The plugin is only used for development deployment; WAR compilation is unaffected. No changes needed for compile/test goals. Document as a known limitation — upgrade to a modern deployment approach (Tomcat 10 + Maven Cargo plugin) is a separate recommended follow-up.

## Plan Review

- All upgrade goals are feasible in a single step (Step 3) with no intermediate versions needed.
- The codebase is clean: no removed APIs, no `sun.*` imports, no reflection-based illegal access patterns detected.
- JDK 21 and Maven 3.9.14 are already available; no environment installation required.
- `tomcat7-maven-plugin` is EOL but does not block compilation or test execution — documented as known limitation.
- No multi-module structure; single `pom.xml` governs the entire project.
